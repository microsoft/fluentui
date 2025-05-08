import * as React from 'react';
import { childrenOrFragmentToArray } from './childrenOrFragmentToArray';

// A Stagger is a component that accepts JSX children and renders them in a staggered manner with a set delay
export const Stagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  autoloop?: boolean;
  reverse?: boolean;
  onMotionFinish?: () => void;
}> = ({ children, delay = 100, reverse = true, autoloop = false, onMotionFinish = () => null }) => {
  const [index, setIndex] = React.useState(-1);
  const components = childrenOrFragmentToArray(children);
  // const visibleCount = useStaggeredReveal(components.length, delay);
  // const index = visibleCount - 1;

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

  // childElements.slice(0, visibleCount).map(

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
