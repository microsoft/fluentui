import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { useMergedRefs } from './useMergedRefs';

describe('useMergedRefs', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper && wrapper.exists()) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('always returns the same ref (refs should be immutable)', () => {
    let lastMergedRef;
    const refFunc = () => null;
    const TestComponent: React.FunctionComponent = () => {
      lastMergedRef = useMergedRefs<boolean>(refFunc);
      return null;
    };

    wrapper = mount(<TestComponent />);
    const ref1 = lastMergedRef;
    wrapper.setProps({});
    const ref2 = lastMergedRef;

    expect(ref1).toBe(ref2);
  });

  it('always mutates the ref when 1 or more merged refs mutate', () => {
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

  it('updates the current property', () => {
    let mergedRef: (React.RefObject<string> & ((val: string) => void)) | undefined = undefined;

    const TestComponent: React.FunctionComponent = () => {
      mergedRef = useMergedRefs(React.useRef<string>(''), React.useRef<string>(''));

      mergedRef('123');

      return null;
    };

    wrapper = mount(<TestComponent />);

    expect(mergedRef).toBeTruthy();
    expect(mergedRef!.current).toEqual('123');
  });

  it('reuses the same ref callback if refs remain stable', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const refValueFunc = (val: boolean) => {};
    let refCallback: React.RefObject<boolean> | undefined = undefined;

    const TestComponent: React.FunctionComponent = () => {
      refCallback = useMergedRefs<boolean>(refObject, refValueFunc);
      return null;
    };

    wrapper = mount(<TestComponent />);

    const firstRefCallback = refCallback;

    // Re-render the component
    wrapper.update();

    expect(refCallback).toBe(firstRefCallback);
  });

  it('handles changing ref callbacks', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();

    let firstRefValue: boolean | null = null;
    let refValueFunc = (val: boolean) => (firstRefValue = val);

    const TestComponent: React.FunctionComponent = () => {
      const mergedRef = useMergedRefs<boolean>(refObject, refValueFunc);

      mergedRef(true);

      return null;
    };

    wrapper = mount(<TestComponent />);

    let secondRefValue: boolean | null = null;
    refValueFunc = (val: boolean) => (secondRefValue = val);

    // Re-render the component
    wrapper.setProps({});

    expect(firstRefValue).toBe(true);
    expect(secondRefValue).toBe(true);
  });
});
