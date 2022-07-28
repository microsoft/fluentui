import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogSurface } from './DialogSurface';
import { isConformant } from '../../common/isConformant';
import type { DialogSurfaceProps } from './DialogSurface.types';

describe('DialogSurface', () => {
  isConformant<DialogSurfaceProps>({
    Component: DialogSurface,
    displayName: 'DialogSurface',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogSurface>Default DialogSurface</DialogSurface>);
    expect(result.container).toMatchSnapshot();
  });
});
