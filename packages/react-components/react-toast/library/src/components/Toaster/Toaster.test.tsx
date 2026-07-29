import * as React from 'react';
import { render } from '@testing-library/react';
import { Toaster } from './Toaster';
import { isConformant } from '../../testing/isConformant';
import type { ToasterProps } from './Toaster.types';

describe('Toaster', () => {
  const testid = 'test';
  isConformant<ToasterProps>({
    Component: Toaster,
    displayName: 'Toaster',
    requiredProps: { 'data-testid': testid } as ToasterProps,
    getTargetElement: result => result.getByTestId(testid),
    disabledTests: [
      // The component does not forward refs
      'component-has-root-ref',
      'component-handles-ref',
      // FIXME: can't find a way to dispatch a toast during a conformance test
      'component-has-static-classnames-object',
      'component-handles-classname',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // Same FIXME as above, one layer down: `renderToaster` renders a position container
      // only for positions that HAVE toasts, so a Toaster with none renders just the two
      // AriaLive regions and there is no element carrying `group/fui-toaster` to assert
      // against. `component-has-group-marker` (a default test since DECISIONS.md D16.6) is
      // therefore opted out here rather than satisfied, and `classname-overrides-win` is
      // deliberately NOT added for the same reason — it is the replacement for
      // `component-handles-classname`, which is already off above. The marker itself is
      // covered by `Toast.cy.tsx`, which dispatches real toasts in a browser.
      'component-has-group-marker',
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses; this hook
      // now composes with clsx and never calls it.
      'make-styles-overrides-win',
    ],
  });

  it('renders a default state', () => {
    const result = render(<Toaster />);
    expect(result.container).toMatchSnapshot();
  });
});
