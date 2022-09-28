import * as React from 'react';
import { contexts } from './contexts';

export type StressComponentProps = {
  id?: string;
  count: number;
  checked: boolean;
};

export const StressComponent: React.FC<StressComponentProps> = ({ count, checked }) => {
  const { value } = React.useContext(contexts[count]);
  return (
    <div>
      Context: {value} {checked}
    </div>
  );
};
