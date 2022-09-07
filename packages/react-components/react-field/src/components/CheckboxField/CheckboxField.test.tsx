import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { CheckboxField, checkboxFieldClassNames } from './CheckboxField';

describe('CheckboxField', () => {
  isConformant({
    Component: CheckboxField,
    displayName: 'CheckboxField',
    primarySlot: 'control',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'label',
            fieldLabel: 'fieldLabel',
            validationState: 'error',
            validationMessage: 'validationMessage',
            hint: 'hint',
          },
          expectedClassNames: checkboxFieldClassNames,
        },
      ],
    },
  });

  beforeEach(resetIdsForTests);

  it('renders a default state', () => {
    const result = render(<CheckboxField label="Checkbox" />);
    expect(result.container).toMatchSnapshot();
  });
});
