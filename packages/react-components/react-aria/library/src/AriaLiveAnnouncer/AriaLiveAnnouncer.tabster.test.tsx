import { act, render } from '@testing-library/react';
import { useDangerousNeverHidden_unstable, useModalAttributes } from '@fluentui/react-tabster';
import * as React from 'react';

import { AriaLiveAnnouncer } from './AriaLiveAnnouncer';

// The live region marks itself with Tabster's never-hide attribute without depending on react-tabster.
// These tests use the real Tabster modalizer to make sure the attribute keeps working if Tabster changes it.
describe('AriaLiveAnnouncer with Tabster', () => {
  const Modal = () => {
    const { modalAttributes } = useModalAttributes({ trapFocus: true });

    return (
      <div {...modalAttributes}>
        <button>inside modal</button>
      </div>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('uses the attribute that Tabster designates as never hidden', () => {
    render(<AriaLiveAnnouncer />);

    const liveRegion = document.body.querySelector('[aria-live="assertive"]');

    expect(liveRegion).not.toBeNull();
    Object.entries(useDangerousNeverHidden_unstable()).forEach(([key, value]) => {
      expect(liveRegion?.getAttribute(key)).toBe(value);
    });
  });

  it('keeps the live region accessible while a Tabster modal is active', () => {
    const background = document.createElement('div');
    document.body.appendChild(background);

    const { getByRole } = render(
      <AriaLiveAnnouncer>
        <Modal />
      </AriaLiveAnnouncer>,
    );

    act(() => {
      getByRole('button').focus();
      jest.runAllTimers();
    });

    const liveRegion = document.body.querySelector('[aria-live="assertive"]');

    // Sanity check: the modal is active and hides content outside of it
    expect(background.getAttribute('aria-hidden')).toBe('true');
    expect(liveRegion?.hasAttribute('aria-hidden')).toBe(false);

    background.remove();
  });
});
