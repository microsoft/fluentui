import * as React from 'react';
import { createMergedRef } from './createMergedRef';
import { mount } from 'enzyme';

describe('createMergedRef', () => {
  it('can merge refs', () => {
    const ref1 = React.createRef<HTMLDivElement>();
    class Foo extends React.Component<{ domRef?: React.Ref<HTMLDivElement> }> {
      private mergedRef = createMergedRef<HTMLDivElement>();

      public render() {
        return <div ref={this.mergedRef(this.props.domRef, ref1)} />;
      }
    }
    const ref2 = React.createRef<HTMLDivElement>();
    const wrapper = mount(<Foo domRef={ref2} />);

    expect(ref1.current).toBeTruthy();
    expect(ref2.current).toBeTruthy();

    wrapper.unmount();

    expect(ref1.current).toBeNull();
    expect(ref2.current).toBeNull();
  });

  it('returns the same ref object with the same input twice', () => {
    const mergedRef = createMergedRef();

    expect(mergedRef()).toBe(mergedRef());
  });

  it('should return a new resolver if the refs change', () => {
    const mergedRef = createMergedRef();

    expect(mergedRef(null)).not.toBe(mergedRef(React.createRef()));
  });
});
