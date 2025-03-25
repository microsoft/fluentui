import * as React from 'react';
import { childrenOrFragmentToArray } from './Series';

// A Stagger is a component that accepts JSX children and renders them in a staggered manner with a set delay
export const Stagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  autoloop?: boolean;
  reverse?: boolean;
  onMotionFinish?: () => void;
}> = ({ children, delay = 500, reverse = true, autoloop = false, onMotionFinish = () => null }) => {
  const [index, setIndex] = React.useState(-1);
  const components = childrenOrFragmentToArray(children);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (index < components.length - 1) {
        setIndex(index + 1);
      } else if (autoloop) {
        setIndex(0);
      } else {
        // TODO: call onMotionFinish only when the last component is finished
        onMotionFinish();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [index, delay, components.length, autoloop, onMotionFinish]);

  // return all components up to the current index
  return (
    <>
      {components.map((component, i) => {
        if (i <= index) {
          return React.cloneElement(component, { key: i });
        }
        return null;
      })}
    </>
  );
};

export const PresenceStagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  autoloop?: boolean;
  mode?: 'enter' | 'exit' | 'enterReverse' | 'exitReverse';
  exit?: boolean;
  reverse?: boolean;
  onMotionFinish?: () => void;
}> = ({
  children,
  delay = 500,
  exit = false,
  reverse = false,
  mode = 'enter',
  autoloop = false,
  onMotionFinish = () => null,
}) => {
  const [index, setIndex] = React.useState(-1);
  const components = childrenOrFragmentToArray(children);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (index < components.length - 1) {
        setIndex(index + 1);
      } else if (autoloop) {
        setIndex(0);
      } else {
        // TODO: call onMotionFinish only when the last component is finished
        setTimeout(() => onMotionFinish(), 2000);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [index, delay, components.length, autoloop, onMotionFinish]);

  // return all components up to the current index
  return (
    <>
      {components.map((component, i) => {
        let visible = false;
        if (mode === 'enter') {
          visible = i <= index;
        } else if (mode === 'exit') {
          visible = !(i <= index);
        } else if (mode === 'exitReverse') {
          visible = components.length - i > index + 1;
        } else if (mode === 'enterReverse') {
          visible = !(components.length - i > index + 1);
        }
        // if (exit) {
        //   visible = !visible;
        // }
        return React.cloneElement(component, { key: i, visible });
      })}
    </>
  );
};
