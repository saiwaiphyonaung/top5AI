import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MARKET_COMPANY_COLORS, STOCK_TICKERS } from '../../constants';
import { useStockData } from '../../hooks/useStockData';

const StockChart: React.FC = () => {
  const { data, loading, error } = useStockData();
  const tickers = Object.keys(MARKET_COMPANY_COLORS);

  if (loading) {
    return (
      <div className="bg-[var(--color-surface)] p-6 rounded-xl shadow-sm w-full h-96 flex justify-center items-center border border-[var(--color-border)]">
        <p className="text-[var(--color-text-muted)]">Loading Market Data...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="bg-red-50 text-red-700 border-red-200 border p-6 rounded-xl shadow-sm w-full h-96 flex flex-col justify-center items-center text-center">
        <h4 className="font-bold text-lg text-red-900 mb-2">Error Fetching Market Data</h4>
        <p className="text-sm">{error}</p>
        <p className="text-xs mt-4 text-red-600">This may be due to API rate limits. Please try again later. The free plan is limited to 25 requests per day.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] p-4 sm:p-6 rounded-xl shadow-sm w-full h-96 border border-[var(--color-border)]">
        <ResponsiveContainer>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-text-muted)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--color-text-muted)" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} domain={['dataMin', 'dataMax']} />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }} 
                    labelStyle={{ color: 'var(--color-heading)', fontWeight: 'bold' }}
                    formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, STOCK_TICKERS[name as keyof typeof STOCK_TICKERS]]}
                />
                <Legend 
                    wrapperStyle={{color: 'var(--color-text)'}}
                    formatter={(value) => STOCK_TICKERS[value as keyof typeof STOCK_TICKERS]}
                />
                {tickers.map(ticker => (
                    <Line 
                        key={ticker}
                        type="monotone" 
                        dataKey={ticker} 
                        stroke={MARKET_COMPANY_COLORS[ticker]} 
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 6, fill: MARKET_COMPANY_COLORS[ticker] }} 
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default StockChart;