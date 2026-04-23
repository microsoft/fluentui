import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { MessageBar } from './MessageBar';
import { MessageBarBody } from './MessageBarBody/MessageBarBody';
import { MessageBarTitle } from './MessageBarTitle/MessageBarTitle';
import { MessageBarActions } from './MessageBarActions/MessageBarActions';

describe('MessageBar', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: MessageBar,
    displayName: 'MessageBar',
  });

  it('renders composed subcomponents with linked title semantics', () => {
    const { getByRole, getByText } = render(
      <MessageBar intent="warning">
        <MessageBarBody>
          <MessageBarTitle>Storage running low</MessageBarTitle>
          Review the backup configuration.
        </MessageBarBody>
        <MessageBarActions containerAction={<button aria-label="Dismiss">Dismiss</button>}>
          <button>Review</button>
        </MessageBarActions>
      </MessageBar>,
    );

    const group = getByRole('group');
    const title = getByText('Storage running low');

    expect(group).toHaveAttribute('aria-labelledby', title.id);
    expect(group).toHaveAttribute('data-layout', 'singleline');
    expect(group).toHaveAttribute('data-intent', 'warning');
    expect(getByText('Review the backup configuration.')).toBeInTheDocument();
    expect(getByText('Review')).toBeInTheDocument();
  });

  it('sets headless data attributes on actions and group roots', () => {
    const { getByText } = render(
      <MessageBar>
        <MessageBarBody>
          <MessageBarTitle>Saved</MessageBarTitle>
          Changes are synced.
        </MessageBarBody>
        <MessageBarActions>
          <button>Undo</button>
        </MessageBarActions>
      </MessageBar>,
    );

    const actions = getByText('Undo').parentElement;

    expect(actions).toHaveAttribute('data-layout', 'singleline');
    expect(actions).toHaveAttribute('data-has-actions', '');
  });
});
