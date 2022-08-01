import * as React from 'react';
import { render } from '@testing-library/react';
import { Field } from './Field';
import { isConformant } from '../../common/isConformant';
import { fieldClassNames } from './useFieldStyles';

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
    requiredProps: {
      children: <input />,
    },
    disabledTests: ['component-has-static-classname-exported'], // TODO remove this
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Label',
            status: 'error',
            statusText: 'Status text',
            helperText: 'Helper text',
          },
          expectedClassNames: {
            root: fieldClassNames.root,
            label: fieldClassNames.label,
            statusText: fieldClassNames.statusText,
            statusIcon: fieldClassNames.statusIcon,
            helperText: fieldClassNames.helperText,
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <Field>
        <input />
      </Field>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
