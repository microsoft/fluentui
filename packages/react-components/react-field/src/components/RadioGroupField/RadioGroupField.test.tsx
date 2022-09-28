import * as React from 'react';
import { Radio } from '@fluentui/react-radio';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { RadioGroupField } from './RadioGroupField';

describe('RadioGroupField', () => {
  isConformant({
    Component: RadioGroupField,
    displayName: 'RadioGroupField',
  });

  // Most functionality is tested by Field.test.tsx, and RadioGroup's tests

  it('uses aria-labelledby for the label', () => {
    const result = render(
      <RadioGroupField label="Test label">
        <Radio label="item" />
      </RadioGroupField>,
    );

    const radioGroup = result.getByRole('radiogroup');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(radioGroup.getAttribute('aria-labelledby')).toBe(label.id);
    expect(label.htmlFor).toBeFalsy();
  });
});
