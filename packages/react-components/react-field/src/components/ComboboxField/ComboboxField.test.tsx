import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { ComboboxField, comboboxFieldClassNames } from './ComboboxField';

describe('ComboboxField', () => {
  isConformant({
    Component: ComboboxField,
    displayName: 'ComboboxField',
    primarySlot: 'control',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'label',
            validationState: 'error',
            validationMessage: 'validationMessage',
            hint: 'hint',
          },
          expectedClassNames: comboboxFieldClassNames,
        },
      ],
    },
  });

  beforeEach(resetIdsForTests);

  it('renders a default state', () => {
    const result = render(<ComboboxField />);
    expect(result.container).toMatchSnapshot();
  });
});
