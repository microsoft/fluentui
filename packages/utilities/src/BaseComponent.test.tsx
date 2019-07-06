/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-dom/test-utils';
import { BaseComponent } from './BaseComponent';

describe('BaseComponent', () => {
  it('can resolve refs', () => {
    class Foo extends BaseComponent<{}, {}> {
      public root: HTMLElement;

      public render(): JSX.Element {
        return <div ref={this._resolveRef('root')} />;
      }
    }

    let component = ReactTestUtils.renderIntoDocument(
      <Foo />
      // tslint:disable-next-line:no-any
    ) as any;

    expect(component.root).toBeDefined();
  });
});
