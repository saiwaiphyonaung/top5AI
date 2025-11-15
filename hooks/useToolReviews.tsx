import { useState, useEffect, useCallback } from 'react';
import type { Review } from '../types';

const REVIEWS_STORAGE_KEY = 'aiToolReviews';

type StoredReviews = Record<string, Review[]>;

export const calculateDisplayScore = (baseScore: number, reviews: Review[]): number => {
  const WEIGHT_BASE = 0.7;
  const WEIGHT_USER = 0.3;

  if (reviews && reviews.length > 0) {
    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const normalizedUserScore = averageRating * 2; // Scale 1-5 rating to a 0-10 score
    const finalScore = (baseScore * WEIGHT_BASE) + (normalizedUserScore * WEIGHT_USER);
    return Math.min(finalScore, 10); // Cap score at 10
  }
  return baseScore;
};

const getStoredReviews = (): StoredReviews => {
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error parsing reviews from localStorage", error);
    return {};
  }
};

const setStoredReviews = (reviews: StoredReviews) => {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error("Error saving reviews to localStorage", error);
  }
};

export const useToolReviews = (toolName: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const allReviews = getStoredReviews();
    setReviews(allReviews[toolName] || []);
  }, [toolName]);

  const addReview = useCallback((review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
    };
    
    const allReviews = getStoredReviews();
    const toolReviews = allReviews[toolName] || [];
    const updatedToolReviews = [newReview, ...toolReviews];
    
    allReviews[toolName] = updatedToolReviews;
    setStoredReviews(allReviews);
    setReviews(updatedToolReviews);
  }, [toolName]);

  return { reviews, addReview };
};