import * as React from 'react';
import { render } from '@testing-library/react';
import { BaseComponent } from './BaseComponent';

describe('BaseComponent', () => {
  it('can resolve refs', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    class Foo extends BaseComponent<{}, {}> {
      public root!: HTMLElement;

      public render(): JSX.Element {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        return <div ref={this._resolveRef('root')} />;
      }
    }

    const { container } = render(<Foo />);
    const component = container.firstChild as HTMLElement;

    expect(component).toBeTruthy();
  });
});
