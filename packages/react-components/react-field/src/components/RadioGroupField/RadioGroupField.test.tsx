import * as React from 'react';
import { Radio } from '@fluentui/react-radio';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { RadioGroupField } from './RadioGroupField';

describe('RadioGroupField', () => {
  isConformant({
    Component: RadioGroupField,
    displayName: 'RadioGroupField',
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
        },
      ],
    },
  });

  beforeEach(resetIdsForTests);

  it('renders a default state', () => {
    const result = render(
      <RadioGroupField>
        <Radio label="item" />
      </RadioGroupField>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
