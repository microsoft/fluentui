import * as React from 'react';
import { render } from '@testing-library/react';
import { extendComponent } from './extendComponent';

import type { JSXElement } from './jsx';

describe('extendComponent', () => {
  it('can extend a component with custom lifetime methods', () => {
    let didMount = 0;
    let willUnmount = 0;

    class Foo extends React.Component<{}, {}> {
      constructor(props: {}) {
        super(props);

        extendComponent<Foo>(this, {
          componentDidMount: () => didMount++,
          componentWillUnmount: () => willUnmount++,
        });
      }
      public componentDidMount(): void {
        didMount++;
      }
      public componentWillUnmount(): void {
        willUnmount++;
      }
      public render(): JSXElement {
        return <div />;
      }
    }
    const component = render(<Foo />);
    component.unmount();

    expect(didMount).toEqual(2);
    expect(willUnmount).toEqual(2);
  });
});
