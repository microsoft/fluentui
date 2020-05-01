import { useState } from 'react';

export const useControlledState = (controlledValue: any, defaultValue: any) => {
  const [value, setValue] = useState(defaultValue);
  return [controlledValue === undefined ? value : controlledValue, setValue];
};
