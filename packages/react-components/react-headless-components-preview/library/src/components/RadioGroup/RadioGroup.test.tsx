import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { RadioGroup } from './RadioGroup';
import { Radio } from './Radio';

describe('RadioGroup', () => {
  isConformant({
    Component: RadioGroup,
    displayName: 'RadioGroup',
  });

  it('renders a default state', () => {
    const { getByRole, getAllByRole } = render(
      <RadioGroup defaultValue="option2">
        <Radio label="Option #1" value="option1" />
        <Radio label="Option #2" value="option2" />
        <Radio label="Option #3" value="option3" />
      </RadioGroup>,
    );

    expect(getByRole('radiogroup')).toHaveAttribute('focusgroup', 'radiogroup');
    expect(getAllByRole('radio')).toHaveLength(3);

    expect(getByRole('radio', { name: 'Option #1' })).not.toBeChecked();
    expect(getByRole('radio', { name: 'Option #2' })).toBeChecked();
    expect(getByRole('radio', { name: 'Option #2' })).toHaveAttribute('focusgroupstart');
    expect(getByRole('radio', { name: 'Option #3' })).not.toBeChecked();
  });
});
