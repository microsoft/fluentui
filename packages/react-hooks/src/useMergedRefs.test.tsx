import * as React from 'react';
import { mount } from 'enzyme';
import { useMergedRefs } from './useMergedRefs';

describe('useMergedRefs', () => {
  it('updates all provided refs', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();
    let refValue: boolean | null = null;
    const TestComponent: React.FunctionComponent = () => {
      const mergedRef = useMergedRefs<boolean>(refObject, val => (refValue = val));
      mergedRef(true);
      return null;
    };
    mount(<TestComponent />);

    expect(refObject.current).toBe(true);
    expect(refValue).toBe(true);
  });

  it('reuses the same ref callback if refs remain stable', () => {
    const refObject: React.RefObject<boolean> = React.createRef<boolean>();

    // tslint:disable-next-line:no-empty
    const refValueFunc = (val: boolean) => {};

    let refCallback: Function | undefined = undefined;
    const TestComponent: React.FunctionComponent = () => {
      refCallback = useMergedRefs<boolean>(refObject, refValueFunc);
      return null;
    };

    const wrapper = mount(<TestComponent />);

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

    const wrapper = mount(<TestComponent />);

    let secondRefValue: boolean | null = null;
    refValueFunc = (val: boolean) => (secondRefValue = val);

    // Re-render the component
    wrapper.setProps({});

    expect(firstRefValue).toBe(true);
    expect(secondRefValue).toBe(true);
  });
});
