import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { extendComponent } from './extendComponent';

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
      public render(): JSX.Element {
        return <div />;
      }
    }
    const component = renderer.create(<Foo />);
    component.unmount();

    expect(didMount).toEqual(2);
    expect(willUnmount).toEqual(2);
  });
});
