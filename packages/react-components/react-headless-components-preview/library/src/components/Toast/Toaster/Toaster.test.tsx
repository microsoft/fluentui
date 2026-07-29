import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Toaster } from './Toaster';

describe('Toaster', () => {
  isConformant({
    Component: Toaster,
    displayName: 'Toaster',
    disabledTests: [
      // Toaster is a wrapper that does not expose a single root element.
      'component-has-root-ref',
      'component-handles-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
      // Toaster is exported from `toast.ts` rather than top-level `toaster.ts`.
      'has-top-level-file-extra',
      'export-map-entry-exists',
    ],
  });

  it('mounts an aria-live region on document.body by default', () => {
    // AriaLiveAnnouncer attaches its live region directly to document.body
    // (not inside the Toaster's React tree) so a single shared region serves
    // the whole app. The DOM fallback path only renders an assertive region;
    // polite messages on browsers without `ariaNotify` are announced assertively.
    render(<Toaster />);

    expect(document.body.querySelector('[aria-live="assertive"]')).not.toBeNull();
  });

  it('does not render position containers when there are no toasts', () => {
    const { container } = render(<Toaster />);

    expect(container.querySelector('[data-toaster-position]')).toBeNull();
  });

  it('does not mount its own live region when a custom `announce` prop is supplied', () => {
    const before = document.body.querySelectorAll('[aria-live]').length;

    render(<Toaster announce={jest.fn()} />);

    expect(document.body.querySelectorAll('[aria-live]').length).toBe(before);
  });
});
