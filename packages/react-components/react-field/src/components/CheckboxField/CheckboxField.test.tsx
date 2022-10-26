import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { CheckboxField } from './CheckboxField';

describe('CheckboxField', () => {
  isConformant({
    Component: CheckboxField,
    displayName: 'CheckboxField',
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
        },
      ],
    },
  });

  // Most functionality is tested by Field.test.tsx, and Checkbox's tests

  it('sets htmlFor on label', () => {
    const result = render(<CheckboxField label="checkbox label" />);

    const checkbox = result.getByRole('checkbox');
    const checkboxLabel = result.getByText('checkbox label') as HTMLLabelElement;

    expect(checkbox.id).toBeTruthy();
    expect(checkboxLabel.htmlFor).toBe(checkbox.id);
    expect(checkbox.getAttribute('aria-labelledby')).toBeFalsy();
  });

  it('sets htmlFor on both label and fieldLabel', () => {
    const result = render(<CheckboxField label="checkbox label" fieldLabel="field label" />);

    const checkbox = result.getByRole('checkbox');
    const checkboxLabel = result.getByText('checkbox label') as HTMLLabelElement;
    const fieldLabel = result.getByText('field label') as HTMLLabelElement;

    expect(checkbox.id).toBeTruthy();
    expect(checkboxLabel.htmlFor).toBe(checkbox.id);
    expect(fieldLabel.htmlFor).toBe(checkbox.id);
    expect(checkbox.getAttribute('aria-labelledby')).toBeFalsy();
  });
});
