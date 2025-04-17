import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';

const IS_REACT_19 = React.version.startsWith('19.');
const CHILD_ERROR_MESSAGE = [
  '@fluentui/react-motion: Invalid child element.',
  '\n',
  'Motion factories require a single child element to be passed. ',
  'That element element should support ref forwarding i.e. it should be either an intrinsic element (e.g. div) or a component that uses React.forwardRef().',
].join('');

/**
 * A backwards-compatible way to get the ref from a React element without console errors.
 */
function getRefFromReactElement<T>(element: React.ReactElement): React.Ref<T> | undefined {
  if (IS_REACT_19) {
    return element.props.ref;
  }

  return (element as React.ReactElement & { ref: React.Ref<T> | undefined }).ref;
}

/**
 * Validates the child and returns a cloned child element with a ref.
 *
 * Throws an error if the child is not a valid React element, similar to "React.Children.only".
 * Logs a warning in development mode if the ref is not set as the component remains functional.
 */
export function useChildElement(
  children: React.ReactElement,
  mounted: boolean = true,
): [React.ReactElement, React.RefObject<HTMLElement>] {
  const childRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (mounted && !childRef.current) {
        // eslint-disable-next-line no-console
        console.error(CHILD_ERROR_MESSAGE);
      }
    }
  }, [mounted]);

  try {
    const child = React.Children.only(children) as Parameters<typeof React.isValidElement>[0];

    if (React.isValidElement(child)) {
      return [
        React.cloneElement(child as React.ReactElement<{ ref: React.Ref<HTMLElement> }>, {
          ref: useMergedRefs(childRef, getRefFromReactElement(child)),
        }),
        childRef,
      ];
    }
  } catch {
    /* empty */
  }

  throw new Error(CHILD_ERROR_MESSAGE);
}
