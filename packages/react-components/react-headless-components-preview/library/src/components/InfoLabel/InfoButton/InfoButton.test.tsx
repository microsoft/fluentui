import * as React from 'react';
import { InfoButton } from './InfoButton';
import { isConformant } from '../../../testing/isConformant';
import { render } from '@testing-library/react';

describe('InfoButton', () => {
  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
    requiredProps: {
      info: "This is an InfoButton's information.",
    },
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level', 'has-top-level-file-extra'],
  });

  it('exposes open state on the trigger', () => {
    const { getByRole } = render(<InfoButton info="Information" popover={{ open: true }} />);

    expect(getByRole('button', { name: 'information' })).toHaveAttribute('data-open');
  });
});
