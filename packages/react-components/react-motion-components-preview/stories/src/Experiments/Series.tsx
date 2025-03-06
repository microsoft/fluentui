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
// TODO: add a prop to control the autoplay
// TODO: add onMotionFinish callback to support nesting of Series
// TODO: add a Pause component to pause the series for a duration
export const Series: React.FC = ({ children }) => {
  const [index, setIndex] = React.useState(0);

  const components = childrenOrFragmentToArray(children);
  const currentComponent = components[index];
  const onMotionFinish = () => {
    if (index < components.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  return React.cloneElement(currentComponent, { onMotionFinish });
};
