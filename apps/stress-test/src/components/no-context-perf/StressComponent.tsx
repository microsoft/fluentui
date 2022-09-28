import * as React from 'react';

export type StressComponentProps = {
  id?: string;
  count: number;
  checked: boolean;
};

export const StressComponent: React.FC<StressComponentProps> = ({ count, checked }) => {
  return (
    <div>
      Context: {count} {checked}
    </div>
  );
};
