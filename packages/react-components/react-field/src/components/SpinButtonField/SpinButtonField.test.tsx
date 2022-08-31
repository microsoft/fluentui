import * as React from 'react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { SpinButtonField } from './SpinButtonField';

describe('SpinButtonField', () => {
  isConformant({
    Component: SpinButtonField,
    displayName: 'SpinButtonField',
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
    const result = render(<SpinButtonField />);
    expect(result.container).toMatchSnapshot();
  });
});
