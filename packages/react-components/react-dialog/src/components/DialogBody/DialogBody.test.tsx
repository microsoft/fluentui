import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogBody } from './DialogBody';
import { isConformant } from '../../testing/isConformant';
import type { DialogBodyProps } from './DialogBody.types';

describe('DialogBody', () => {
  isConformant<DialogBodyProps>({
    Component: DialogBody,
    displayName: 'DialogBody',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogBody>Default DialogBody</DialogBody>);
    expect(result.container).toMatchSnapshot();
  });
});
