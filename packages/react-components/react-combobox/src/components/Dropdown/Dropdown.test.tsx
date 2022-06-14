import * as React from 'react';
import { render } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { isConformant } from '../../common/isConformant';

describe('Dropdown', () => {
  isConformant({
    Component: Dropdown,
    displayName: 'Dropdown',
    primarySlot: 'button',
    // don't test deprecated className export on new components
    disabledTests: ['component-has-static-classname-exported'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            open: true,
            // Portal messes with the classNames test, so rendering the listbox inline here
            inlinePopup: true,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Dropdown>Default Dropdown</Dropdown>);
    expect(result.container).toMatchSnapshot();
  });
});
