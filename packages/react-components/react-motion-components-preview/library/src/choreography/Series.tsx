import * as React from 'react';
import { childrenOrFragmentToArray } from './childrenOrFragmentToArray';

// A Series is a component that accepts an array of motion components and plays them in sequence
// TODO: add a delay between each component
export const Series: React.FC<{
  children: React.ReactNode;
  autoloop?: boolean;
  commonProps?: Record<string, unknown>;
  onMotionFinish?: () => void;
}> = ({ children, autoloop = false, commonProps, onMotionFinish = () => null }) => {
  const [index, setIndex] = React.useState(0);

  const components = childrenOrFragmentToArray(children);
  const currentComponent = components[index];
  const onComponentFinish = () => {
    if (index < components.length - 1) {
      setIndex(index + 1);
    } else if (autoloop) {
      setIndex(0);
    } else {
      // TODO: call onMotionFinish only when the last component is finished
      onMotionFinish();
    }
  };

  return React.cloneElement(currentComponent, { ...commonProps, onMotionFinish: onComponentFinish });
};
