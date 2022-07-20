import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogContent } from './DialogContent';
import { isConformant } from '../../common/isConformant';
import type { DialogContentProps } from './DialogContent.types';

describe('DialogContent', () => {
  isConformant<DialogContentProps>({
    Component: DialogContent,
    displayName: 'DialogContent',
    disabledTests: ['component-has-static-classname-exported'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DialogContent>Default DialogContent</DialogContent>);
    expect(result.container).toMatchSnapshot();
  });
});
