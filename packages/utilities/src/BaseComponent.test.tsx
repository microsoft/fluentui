import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';
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

    let component = ReactTestUtils.renderIntoDocument(
      <Foo />,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;

    expect(component.root).toBeTruthy();
  });
});
