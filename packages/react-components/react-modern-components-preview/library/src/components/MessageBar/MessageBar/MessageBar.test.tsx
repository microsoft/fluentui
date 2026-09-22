import * as React from 'react';
import { render } from '@testing-library/react';
import { MessageBar } from './MessageBar';
import { messageBarClassNames } from './useMessageBarStyles.styles';
import { MessageBarActions } from '../MessageBarActions/MessageBarActions';
import { messageBarActionsClassNames } from '../MessageBarActions/useMessageBarActionsStyles.styles';
import { MessageBarBody } from '../MessageBarBody/MessageBarBody';
import { messageBarBodyClassNames } from '../MessageBarBody/useMessageBarBodyStyles.styles';
import { MessageBarTitle } from '../MessageBarTitle/MessageBarTitle';
import { messageBarTitleClassNames } from '../MessageBarTitle/useMessageBarTitleStyles.styles';

describe('MessageBar', () => {
  it('renders defaults and all compound regions', () => {
    const { getByRole, getByTestId, getByText } = render(
      <MessageBar className="consumer-class" layout="singleline">
        <MessageBarBody data-testid="body">
          <MessageBarTitle>Notice</MessageBarTitle>
          Details
        </MessageBarBody>
        <MessageBarActions data-testid="actions">Action</MessageBarActions>
      </MessageBar>,
    );
    const root = getByRole('group');

    expect(root).toHaveClass(messageBarClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-intent', 'info');
    expect(root).toHaveAttribute('data-shape', 'rounded');
    expect(getByText('Notice')).toHaveClass(messageBarTitleClassNames.root);
    expect(getByTestId('body')).toHaveClass(messageBarBodyClassNames.root);
    expect(getByTestId('actions')).toHaveClass(messageBarActionsClassNames.root);
  });

  it('maps visual variants to data attributes', () => {
    const { getByRole } = render(<MessageBar intent="error" layout="multiline" shape="square" />);
    const root = getByRole('group');

    expect(root).toHaveAttribute('data-intent', 'error');
    expect(root).toHaveAttribute('data-layout', 'multiline');
    expect(root).toHaveAttribute('data-shape', 'square');
  });
});
