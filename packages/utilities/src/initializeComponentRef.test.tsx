import * as React from 'react';
import { initializeComponentRef } from './initializeComponentRef';
import { render } from '@testing-library/react';
import type { IBaseProps } from './BaseComponent.types';

import type { JSXElement } from './jsx';

describe('initializeComponentRef', () => {
  class Foo extends React.Component<IBaseProps, {}> {
    constructor(props: IBaseProps) {
      super(props);
      initializeComponentRef(this);
    }

    public render(): JSXElement {
      return <div />;
    }
  }

  it('can resolve componentRef', () => {
    const fooRef = React.createRef();

    const component = render(<Foo componentRef={fooRef} />);

    expect(fooRef.current).toBeTruthy();

    component.unmount();

    expect(fooRef.current).toBeNull();
  });
});
