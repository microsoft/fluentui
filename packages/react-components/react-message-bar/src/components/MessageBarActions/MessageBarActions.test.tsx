import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBarActions } from './MessageBarActions';
import { MessageBarActionsProps } from './MessageBarActions.types';

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
