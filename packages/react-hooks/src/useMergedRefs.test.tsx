import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { useMergedRefs } from './useMergedRefs';

describe('useMergedRefs', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    wrapper?.unmount();
    wrapper = undefined;
  });

  it('always returns the different ref instance', () => {
    let lastMergedRef;

    const TestComponent: React.FunctionComponent = () => {
      lastMergedRef = useMergedRefs<boolean>(() => ({}));
      return null;
    };

    wrapper = mount(<TestComponent />);
    const ref1 = lastMergedRef;
    wrapper.setProps({});
    const ref2 = lastMergedRef;

    expect(ref1).not.toBe(ref2);
  });

  it('updates all provided refs', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();
    let refValue: boolean | null = null;
    const TestComponent: React.FunctionComponent = () => {
      const mergedRef = useMergedRefs<boolean>(refObject, val => (refValue = val));
      mergedRef(true);
      return null;
    };
    wrapper = mount(<TestComponent />);

    expect(refObject.current).toBe(true);
    expect(refValue).toBe(true);
  });

  it('refs are called when component re-renders', () => {
    const refObject = React.createRef<HTMLElement>();
    let refValue: HTMLElement | null = null;

    const TestComponent = React.forwardRef((props: { content?: string }, ref) => {
      const mergedRef = useMergedRefs(ref, (element: HTMLElement) => {
        refValue = element;
      });
      return <div ref={mergedRef}>{props.content || 'content'}</div>;
    });

    wrapper = mount(<TestComponent ref={refObject} />);

    expect(refObject.current).toBeDefined();
    expect(refObject.current?.innerHTML).toBe('content');
    expect(refValue).toBe(refObject.current);

    wrapper.setProps({ content: 'content2' });

    expect(refObject.current).toBeDefined();
    expect(refObject.current?.innerHTML).toBe('content2');
    expect(refValue).toBe(refObject.current);
  });
});
