import React from 'react';
import Button from '../atoms/Button';

export type ChartType = 'bar' | 'line' | 'pie';

interface ChartSwitcherProps {
  chartType: ChartType;
  onChange: (type: ChartType) => void;
}

const chartTypes: ChartType[] = ['bar', 'line', 'pie'];

const ChartSwitcher: React.FC<ChartSwitcherProps> = ({ chartType, onChange }) => (
  <div className="flex gap-2 mb-4 flex-wrap">
    {chartTypes.map((type) => (
      <Button
        key={type}
        className={`text-sm sm:text-base px-3 sm:px-4 py-2 ${
          chartType === type ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onChange(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    ))}
  </div>
);

export default ChartSwitcher; 