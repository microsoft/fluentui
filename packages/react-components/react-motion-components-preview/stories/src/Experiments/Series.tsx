import * as React from 'react';

export const isFragment = (child: React.ReactNode): child is React.ReactElement => {
  return React.isValidElement(child) && child.type === React.Fragment;
};

// Convert children that is either React.Fragment or regular React.Children to an array of React elements
export const childrenOrFragmentToArray = (children: React.ReactNode): React.ReactElement[] => {
  if (isFragment(children)) {
    return React.Children.toArray(children.props.children) as React.ReactElement[];
  }
  return React.Children.toArray(children) as React.ReactElement[];
};

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

export const Hold: React.FC<{
  duration: number;
  onMotionFinish?: () => void;
}> = ({ duration, children, onMotionFinish = () => null }) => {
  setTimeout(() => {
    onMotionFinish();
  }, duration);

  return <>{children}</>;
};
