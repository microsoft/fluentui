import * as React from 'react';
import { render } from '@testing-library/react';
import { Combobox } from './Combobox';
import { isConformant } from '../../common/isConformant';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    primarySlot: 'trigger',
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
    const result = render(<Combobox>Default Combobox</Combobox>);
    expect(result.container).toMatchSnapshot();
  });
});
