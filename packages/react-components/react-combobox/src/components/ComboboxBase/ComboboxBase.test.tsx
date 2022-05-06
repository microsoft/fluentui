import * as React from 'react';
import { render } from '@testing-library/react';
import { ComboboxBase } from './ComboboxBase';
import { isConformant } from '../../common/isConformant';

describe('ComboboxBase', () => {
  isConformant({
    Component: ComboboxBase,
    displayName: 'ComboboxBase',
    primarySlot: 'input',
    // don't test deprecated className export on new components
    disabledTests: ['component-has-static-classname-exported'],
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            open: true,
            // Portal messes with the classNames test, so rendering the listbox inline here
            inline: true,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ComboboxBase>Default ComboboxBase</ComboboxBase>);
    expect(result.container).toMatchSnapshot();
  });
});
