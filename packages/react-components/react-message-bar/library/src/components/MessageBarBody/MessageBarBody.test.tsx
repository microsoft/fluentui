import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MessageBarBody } from './MessageBarBody';

describe('MessageBarBody', () => {
  isConformant({
    Component: MessageBarBody,
    displayName: 'MessageBarBody',
  });

  it('renders a default state', () => {
    const result = render(<MessageBarBody>Default MessageBarBody</MessageBarBody>);
    expect(result.container).toMatchSnapshot();
  });
});
