import * as React from 'react';
import { render } from '@testing-library/react';
import { useMergedRefs } from './useMergedRefs';

describe('useMergedRefs', () => {
  it('always returns the same ref (refs should be immutable)', () => {
    let lastMergedRef;
    const refFunc = () => {
      // no-op
    };
    const TestComponent: React.FunctionComponent = () => {
      lastMergedRef = useMergedRefs<boolean>(refFunc);
      return null;
    };

    const { rerender } = render(<TestComponent />);
    const ref1 = lastMergedRef;
    rerender(<TestComponent />);
    const ref2 = lastMergedRef;

    expect(ref1).toBe(ref2);
  });

  it('always mutates the ref when 1 or more merged refs mutate', () => {
    let lastMergedRef;

    const TestComponent: React.FunctionComponent = () => {
      lastMergedRef = useMergedRefs<boolean>((_instance: boolean | null): void => {
        // no-op
        return;
      });
      return null;
    };

    const { rerender } = render(<TestComponent />);
    const ref1 = lastMergedRef;
    rerender(<TestComponent />);
    const ref2 = lastMergedRef;

    expect(ref1).not.toBe(ref2);
  });

  it('updates all provided refs', () => {
    const refObject = React.createRef<boolean | null>();
    let refValue: boolean | null = null;
    const TestComponent: React.FunctionComponent = () => {
      const mergedRef = useMergedRefs<boolean>(refObject, (val): void => {
        refValue = val;
      });

      mergedRef(true);

      return null;
    };
    render(<TestComponent />);

    expect(refObject.current).toBe(true);
    expect(refValue).toBe(true);
  });

  it('updates the current property', () => {
    let mergedRef: (React.RefObject<string | null> & ((val: string) => void)) | undefined = undefined;

    const TestComponent: React.FunctionComponent = () => {
      mergedRef = useMergedRefs(React.useRef<string>(''), React.useRef<string>(''));

      mergedRef('123');

      return null;
    };

    render(<TestComponent />);

    expect(mergedRef).toBeTruthy();
    expect(mergedRef!.current).toEqual('123');
  });

  it('reuses the same ref callback if refs remain stable', () => {
    const refObject = React.createRef<boolean>();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const refValueFunc = (val: boolean) => {};
    let refCallback: React.RefObject<boolean | null> | undefined = undefined;

    const TestComponent: React.FunctionComponent = () => {
      refCallback = useMergedRefs<boolean>(refObject, refValueFunc);
      return null;
    };

    const { rerender } = render(<TestComponent />);

    const firstRefCallback = refCallback;

    // Re-render the component
    rerender(<TestComponent />);

    expect(refCallback).toBe(firstRefCallback);
  });

  it('handles changing ref callbacks', () => {
    const refObject = React.createRef<boolean>();

    let firstRefValue: boolean | null = null;
    let refValueFunc = (val: boolean): void => {
      firstRefValue = val;
    };

    const TestComponent: React.FunctionComponent<{ update?: boolean }> = () => {
      const mergedRef = useMergedRefs<boolean>(refObject, refValueFunc);

      mergedRef(true);

      return null;
    };

    const { rerender } = render(<TestComponent />);

    let secondRefValue: boolean | null = null;
    refValueFunc = (val: boolean): void => {
      secondRefValue = val;
    };

    // Re-render the component
    rerender(<TestComponent update={true} />);

    expect(firstRefValue).toBe(true);
    expect(secondRefValue).toBe(true);
  });
});
