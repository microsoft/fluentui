import * as React from 'react';
import { initializeComponentRef } from './initializeComponentRef';
import * as renderer from 'react-test-renderer';
import type { IBaseProps } from './BaseComponent.types';

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

    const component = renderer.create(<Foo componentRef={fooRef} />);

    expect(fooRef.current).toBe(component.getInstance());

    component.unmount();

    expect(fooRef.current).toBeNull();
  });
});
