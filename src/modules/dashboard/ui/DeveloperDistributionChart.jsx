import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * Chart showing distribution of developer ratings
 * 
 * @param {Object} props
 * @param {Array} props.developers - List of developers to visualize
 */
export default function DeveloperDistributionChart({ developers }) {
  // Calculate distribution of developer ratings
  const getDistribution = () => {
    const distribution = {
      veryLow: 0,  // 0-2
      low: 0,      // 2.1-4
      medium: 0,   // 4.1-6
      high: 0,     // 6.1-8
      veryHigh: 0  // 8.1-10
    };
    
    developers.forEach(dev => {
      const rating = parseFloat(dev.dumperRating);
      if (rating <= 2) distribution.veryLow++;
      else if (rating <= 4) distribution.low++;
      else if (rating <= 6) distribution.medium++;
      else if (rating <= 8) distribution.high++;
      else distribution.veryHigh++;
    });
    
    return [
      { name: 'Very Low (0-2)', value: distribution.veryLow, color: '#EF4444' },
      { name: 'Low (2.1-4)', value: distribution.low, color: '#F97316' },
      { name: 'Medium (4.1-6)', value: distribution.medium, color: '#EAB308' },
      { name: 'High (6.1-8)', value: distribution.high, color: '#22C55E' },
      { name: 'Very High (8.1-10)', value: distribution.veryHigh, color: '#3B82F6' }
    ];
  };
  
  const data = getDistribution();
  
  return (
    <div className="bg-white rounded-lg shadow p-4 h-80">
      <h3 className="text-lg font-bold mb-4">Developer Rating Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} developers`, '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}