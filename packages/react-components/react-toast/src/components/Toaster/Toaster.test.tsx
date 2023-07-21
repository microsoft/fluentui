import * as React from 'react';
import { render } from '@testing-library/react';
import { Toaster } from './Toaster';
import { isConformant } from '../../testing/isConformant';
import { ToasterProps } from './Toaster.types';

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
      'make-styles-overrides-win',
    ],
  });

  it('renders a default state', () => {
    const result = render(<Toaster />);
    expect(result.container).toMatchSnapshot();
  });
});
