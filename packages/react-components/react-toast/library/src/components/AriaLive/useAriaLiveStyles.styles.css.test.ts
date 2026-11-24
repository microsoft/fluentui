import { slot } from '@fluentui/react-utilities';
import type { AriaLiveState } from './AriaLive.types';
import { ariaLiveClassNames, useAriaLiveStyles_unstable } from './useAriaLiveStyles.styles.css';

jest.mock('./AriaLive.module.css', () => ({ visuallyHidden: 'css-hidden' }));

describe('useAriaLiveStyles_unstable (CSS Modules)', () => {
  it('visually hides both live regions and keeps caller classes last', () => {
    const state: AriaLiveState = {
      components: { assertive: 'div', polite: 'div' },
      assertive: slot.always({ className: 'caller-assertive' }, { elementType: 'div' }),
      polite: slot.always({ className: 'caller-polite' }, { elementType: 'div' }),
    };
    expect(useAriaLiveStyles_unstable(state)).toBe(state);
    expect(state.assertive.className).toBe(`css-hidden ${ariaLiveClassNames.assertive} caller-assertive`);
    expect(state.polite.className).toBe(`css-hidden ${ariaLiveClassNames.polite} caller-polite`);
  });
});
