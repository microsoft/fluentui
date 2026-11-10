import * as React from 'react';
import { render } from '@testing-library/react';
import { BaseComponent } from './BaseComponent';

import type { JSXElement } from './jsx';

describe('BaseComponent', () => {
  it('can resolve refs', () => {
    class Foo extends BaseComponent<{}, {}> {
      public root!: HTMLElement;

      public render(): JSXElement {
        return (
          <div
            // @ts-expect-error - react 18 types issue
            ref={this._resolveRef('root')}
          />
        );
      }
    }

    const { container } = render(<Foo />);
    const component = container.firstChild as HTMLElement;

    expect(component).toBeTruthy();
  });
});
