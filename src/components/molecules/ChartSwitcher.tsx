import React from 'react';
import Button from '../atoms/Button';

export type ChartType = 'bar' | 'line' | 'pie';

interface ChartSwitcherProps {
  chartType: ChartType;
  onChange: (type: ChartType) => void;
}

const chartTypes: ChartType[] = ['bar', 'line', 'pie'];

const ChartSwitcher: React.FC<ChartSwitcherProps> = ({ chartType, onChange }) => (
  <div className="flex gap-2 mb-4">
    {chartTypes.map((type) => (
      <Button
        key={type}
        className={chartType === type ? 'bg-green-700' : ''}
        onClick={() => onChange(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    ))}
  </div>
);

export default ChartSwitcher; 