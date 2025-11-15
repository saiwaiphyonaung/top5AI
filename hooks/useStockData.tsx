import { useState, useEffect } from 'react';
import type { StockDataPoint } from '../types';
import { STOCK_TICKERS } from '../constants';

// NOTE: In a real production environment, this API key should be stored in a secure backend or environment variable.
// For this example, we assume `process.env.API_KEY` is provided.
const API_KEY = process.env.API_KEY || 'demo'; // Using 'demo' as a fallback

// Format the time, e.g., '10:30'
const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const useStockData = () => {
    const [data, setData] = useState<StockDataPoint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const tickers = Object.keys(STOCK_TICKERS);
                const promises = tickers.map(ticker =>
                    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&outputsize=compact&apikey=${API_KEY}`)
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(`Failed to fetch data for ${ticker}`);
                            }
                            return res.json();
                        })
                );

                const results = await Promise.all(promises);
                
                const errorResult = results.find(result => result.Note || result['Error Message']);
                if (errorResult) {
                    throw new Error(errorResult.Note || errorResult['Error Message'] || 'An error occurred with the stock data API.');
                }

                const aggregatedData: { [dateTime: string]: { [ticker: string]: number } } = {};

                results.forEach((result, index) => {
                    const ticker = tickers[index];
                    const timeSeries = result['Time Series (15min)'];
                    if (timeSeries) {
                        for (const dateTime in timeSeries) {
                            if (!aggregatedData[dateTime]) {
                                aggregatedData[dateTime] = {};
                            }
                            aggregatedData[dateTime][ticker] = parseFloat(timeSeries[dateTime]['4. close']);
                        }
                    }
                });
                
                const sortedDateTimes = Object.keys(aggregatedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
                
                const formattedData = sortedDateTimes.map(dateTime => {
                    const dataPoint: StockDataPoint = {
                        time: formatTime(dateTime),
                        ...aggregatedData[dateTime]
                    };
                    return dataPoint;
                });

                setData(formattedData as StockDataPoint[]);

            } catch (err: any) {
                console.error("Error fetching stock data:", err);
                setError(err.message || 'Could not fetch stock market data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};