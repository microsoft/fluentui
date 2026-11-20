import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBarActions } from './MessageBarActions';
import type { MessageBarActionsProps } from './MessageBarActions.types';

describe('MessageBarActions', () => {
  isConformant<MessageBarActionsProps>({
    Component: MessageBarActions,
    displayName: 'MessageBarActions',
    disabledTests: [
      // TODO: having problems due to the fact root of DialogTitle is Fragment
      'component-has-static-classnames-object',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MessageBarActions>Default MessageBarActions</MessageBarActions>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('MessageBarActions DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <MessageBarActions containerAction={<button>Close</button>}>
        <button>Action</button>
      </MessageBarActions>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
