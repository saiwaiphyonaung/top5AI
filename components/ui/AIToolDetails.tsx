import React, { useState } from 'react';
import type { AiTool, Review } from '../../types';
import { useToolReviews } from '../../hooks/useToolReviews';

const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
    </svg>
);

const Star: React.FC<{ filled: boolean; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void; className?: string }> = ({ filled, onClick, onMouseEnter, onMouseLeave, className }) => (
    <svg 
        className={`w-6 h-6 cursor-pointer transition-colors ${filled ? 'text-yellow-400' : 'text-gray-300'} ${className}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const StarRatingDisplay: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => (
    <div className={`flex items-center ${className}`}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < rating} className="w-5 h-5 cursor-default" />
        ))}
    </div>
);


const ReviewForm: React.FC<{ onSubmit: (data: { author: string, rating: number, comment: string }) => void }> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }
        if (!comment.trim()) {
            setError('Please enter a comment.');
            return;
        }
        onSubmit({ author: author.trim() || 'Anonymous', rating, comment });
        setRating(0);
        setComment('');
        setAuthor('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
            <h4 className="font-semibold text-md text-[var(--color-heading)]">Leave a Review</h4>
            <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Your Name (Optional)</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    className="w-full text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Rating</label>
                <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            filled={(hoverRating || rating) > i}
                            onClick={() => setRating(i + 1)}
                            onMouseEnter={() => setHoverRating(i + 1)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="comment" className="block text-sm font-medium text-[var(--color-text)] mb-1">Comment</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Share your experience with this tool..."
                    className="w-full text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full sm:w-auto text-center bg-[var(--color-accent)] text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all text-sm">
                Submit Review
            </button>
        </form>
    );
};


const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
    <div className="border-b border-[var(--color-border)] pb-4 last:border-b-0">
        <div className="flex items-center justify-between mb-1">
            <h5 className="font-bold text-[var(--color-heading)]">{review.author}</h5>
            <span className="text-xs text-[var(--color-text-muted)]">{new Date(review.date).toLocaleDateString()}</span>
        </div>
        <StarRatingDisplay rating={review.rating} />
        <p className="text-sm text-[var(--color-text)] mt-2">{review.comment}</p>
    </div>
);


const AIToolDetails: React.FC<{ tool: AiTool }> = ({ tool }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const { reviews, addReview } = useToolReviews(tool.name);

  const handleReportData = () => {
    const subject = `Incorrect Data Report for ${tool.name}`;
    const body = `Hello Top 5 AI Team,

I've noticed some incorrect information for the tool "${tool.name}".

Tool URL: ${tool.url}
Our Page Link: ${window.location.href}

Please specify what is incorrect below:
- Description: 
- Pricing:
- Pros/Cons:
- Other:

Additional details:
[Please provide more information here]

Thank you!
`;
    window.location.href = `mailto:feedback@top5.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
    
  return (
    <div className="bg-gray-50/70">
        <div className="px-6 pt-4 pb-6">
            <div className="flex border-b border-[var(--color-border)] mb-4">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-4 text-sm font-semibold transition-colors -mb-px ${activeTab === 'details' ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)]'}`}
                >
                  Details
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 px-4 text-sm font-semibold transition-colors -mb-px ${activeTab === 'reviews' ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-heading)]'}`}
                >
                  Reviews ({reviews.length})
                </button>
            </div>
            
            {activeTab === 'details' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <h4 className="font-semibold text-lg text-green-700 mb-2">Pros</h4>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--color-text)]">
                      {tool.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-red-700 mb-2">Cons</h4>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--color-text)]">
                      {tool.cons.map((con, i) => <li key={i}>{con}</li>)}
                    </ul>
                  </div>
                </div>

                {tool.pricingPlans && tool.pricingPlans.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <h4 className="font-semibold text-lg text-[var(--color-heading)] mb-4">Pricing Plans</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tool.pricingPlans.map((plan, index) => (
                        <div key={index} className="border border-[var(--color-border)] rounded-lg p-4 bg-white flex flex-col hover:border-[var(--color-accent)]/50 transition-colors shadow-sm">
                          <h5 className="font-bold text-md text-[var(--color-heading)]">{plan.name}</h5>
                          <p className="text-2xl font-bold text-[var(--color-accent)] my-2">{plan.price}</p>
                          <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--color-text)] flex-grow">
                            {plan.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
                    <button
                        onClick={handleReportData}
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-red-600 font-semibold transition-colors group"
                    >
                        <FlagIcon className="w-5 h-5 text-red-500/80 group-hover:text-red-600 transition-colors" />
                        Report Incorrect Data
                    </button>
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">
                        Help us keep our information accurate and up-to-date.
                    </p>
                </div>

              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ReviewForm onSubmit={addReview} />
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  <h4 className="font-semibold text-md text-[var(--color-heading)] mb-2">User Reviews</h4>
                  {reviews.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <StarRatingDisplay rating={averageRating} />
                        <span className="font-bold text-lg text-[var(--color-heading)]">{averageRating.toFixed(1)}</span>
                        <span className="text-sm text-[var(--color-text-muted)]">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                      </div>
                      {reviews.map(review => <ReviewItem key={review.id} review={review} />)}
                    </>
                  ) : (
                    <p className="text-sm text-[var(--color-text-muted)] text-center py-8">Be the first to leave a review!</p>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
  );
};

export default AIToolDetails;