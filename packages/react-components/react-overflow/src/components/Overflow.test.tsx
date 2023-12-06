import * as React from 'react';
import { render } from '@testing-library/react';
import { Overflow } from './Overflow';
import { OverflowItem } from './OverflowItem';
describe('Overflow', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  });

  it('foo', async () => {
    // Updates to overflow state are batched with a microtask debouncer (see createOverflowManager)
    // This means that unit tests will often warn on updates happening outside of act
    // There's no real way to fix this nicely because there's nothing obvious to wait for since the
    // update happens in a microtask.
    //
    // The current debounce implementation is synchronous when NODE_ENV === 'test'
    // This test is a canary to make sure unit tests don't emit warnings
    console.error = message => {
      throw new Error(message);
    };

    render(
      <Overflow minimumVisible={1}>
        <div>
          <OverflowItem id="1">
            <button>foo</button>
          </OverflowItem>
          <OverflowItem id="2">
            <button>foo</button>
          </OverflowItem>
          <OverflowItem id="3">
            <button>foo</button>
          </OverflowItem>
        </div>
      </Overflow>,
    );
  });
});
