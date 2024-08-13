import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBarGroup } from './MessageBarGroup';

describe('MessageBarGroup', () => {
  isConformant({
    Component: MessageBarGroup,
    displayName: 'MessageBarGroup',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <MessageBarGroup>
        <span>Default MessageBarGroup</span>
      </MessageBarGroup>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
