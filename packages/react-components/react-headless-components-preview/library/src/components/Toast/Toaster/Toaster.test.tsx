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

  it('renders aria-live regions by default', () => {
    const { container } = render(<Toaster />);

    expect(container.querySelector('[aria-live="assertive"]')).not.toBeNull();
    expect(container.querySelector('[aria-live="polite"]')).not.toBeNull();
  });

  it('does not render position containers when there are no toasts', () => {
    const { container } = render(<Toaster />);

    expect(container.querySelector('[data-toaster-position]')).toBeNull();
  });
});
