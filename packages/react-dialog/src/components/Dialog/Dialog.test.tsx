import * as React from 'react';
import { render } from '@testing-library/react';
import { Dialog } from './Dialog';
import { isConformant } from '../../common/isConformant';

describe('Dialog', () => {
  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Dialog>Default Dialog</Dialog>);
    expect(result.container).toMatchSnapshot();
  });
});
