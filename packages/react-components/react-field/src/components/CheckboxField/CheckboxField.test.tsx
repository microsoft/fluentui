import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { CheckboxField, checkboxFieldClassNames } from './CheckboxField';

describe('CheckboxField', () => {
  // Checkbox doesn't use the Field's label, so remove it from the conformance test's expected class names
  const { label: _ignored, ...expectedClassNames } = checkboxFieldClassNames;

  isConformant({
    Component: CheckboxField,
    displayName: 'CheckboxField',
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
          expectedClassNames: (expectedClassNames as unknown) as Record<string, string>,
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
