import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerBody } from './DrawerBody';
import { getScrollState } from './useDrawerBody';
import { isConformant } from '../../testing/isConformant';

describe('DrawerBody', () => {
  isConformant({
    Component: DrawerBody,
    displayName: 'DrawerBody',
  });

  it('renders a default state', () => {
    const result = render(<DrawerBody>Default DrawerBody</DrawerBody>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerBody"
        >
          Default DrawerBody
        </div>
      </div>
    `);
  });

  describe('getScrollState', () => {
    it('returns none when content does not overflow', () => {
      const state = getScrollState({
        scrollTop: 0,
        scrollHeight: 100,
        clientHeight: 100,
      } as HTMLElement);

      expect(state).toBe('none');
    });

    it('returns top when at the start of scrollable content', () => {
      const state = getScrollState({
        scrollTop: 0,
        scrollHeight: 200,
        clientHeight: 100,
      } as HTMLElement);

      expect(state).toBe('top');
    });

    it('returns middle when between top and bottom', () => {
      const state = getScrollState({
        scrollTop: 50,
        scrollHeight: 200,
        clientHeight: 100,
      } as HTMLElement);

      expect(state).toBe('middle');
    });

    it('returns bottom when at the end of scrollable content', () => {
      const state = getScrollState({
        scrollTop: 100,
        scrollHeight: 200,
        clientHeight: 100,
      } as HTMLElement);

      expect(state).toBe('bottom');
    });

    it('returns bottom when within 1px tolerance at the end', () => {
      const state = getScrollState({
        scrollTop: 89.4,
        scrollHeight: 190,
        clientHeight: 100,
      } as HTMLElement);

      expect(state).toBe('bottom');
    });

    it('returns middle when more than 1px away from the end', () => {
      const state = getScrollState({
        scrollTop: 88.9,
        scrollHeight: 190,
        clientHeight: 100,
      } as HTMLElement);

      expect(state).toBe('middle');
    });
  });
});
