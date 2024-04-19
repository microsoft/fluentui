import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogTitle } from './DialogTitle';
import { isConformant } from '../../testing/isConformant';
import type { DialogTitleProps } from './DialogTitle.types';

describe('DialogTitle', () => {
  isConformant<DialogTitleProps>({
    Component: DialogTitle,
    displayName: 'DialogTitle',
    disabledTests: [
      // TODO: having problems due to the fact root of DialogTitle is Fragment
      'component-has-static-classnames-object',
    ],
  });

  it('renders a default state', () => {
    const result = render(<DialogTitle>Default DialogTitle</DialogTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
