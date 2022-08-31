import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { InputField } from './InputField';

describe('InputField', () => {
  isConformant({
    Component: InputField,
    displayName: 'InputField',
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
    const result = render(<InputField />);
    expect(result.container).toMatchSnapshot();
  });
});
