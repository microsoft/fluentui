import * as React from 'react';
import { initializeComponentRef } from './initializeComponentRef';
import { mount } from 'enzyme';
import { IBaseProps } from './BaseComponent.types';

describe('initializeComponentRef', () => {
  class Foo extends React.Component<IBaseProps, {}> {
    constructor(props: IBaseProps) {
      super(props);
      initializeComponentRef(this);
    }

    public render(): JSX.Element {
      return <div />;
    }
  }

  it('can resolve componentRef', () => {
    const fooRef = React.createRef();

    const wrapper = mount(<Foo componentRef={fooRef} />);

    expect(fooRef.current).toBe(wrapper.instance());

    wrapper.unmount();

    expect(fooRef.current).toBeNull();
  });
});
