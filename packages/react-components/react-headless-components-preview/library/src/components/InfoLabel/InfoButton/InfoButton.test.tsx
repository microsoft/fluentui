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
    const { getByRole, rerender } = render(<InfoButton info="Information" popover={{ open: true }} />);
    const trigger = getByRole('button', { name: 'information' });

    expect(trigger).toHaveAttribute('data-open', '');

    rerender(<InfoButton info="Information" popover={{ open: false }} />);

    expect(trigger).not.toHaveAttribute('data-open');
  });

  it('does not expose open state by default', () => {
    const { getByRole } = render(<InfoButton info="Information" />);

    expect(getByRole('button', { name: 'information' })).not.toHaveAttribute('data-open');
  });
});
