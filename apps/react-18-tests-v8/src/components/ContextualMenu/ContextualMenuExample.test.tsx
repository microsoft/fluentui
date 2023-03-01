import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContextualMenuExample } from './ContextualMenuExample';

describe('ContextualMenu in React 18', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  it('should render ContextualMenu when trigger button is clicked', () => {
    const { getByRole, queryAllByRole } = render(
      <React.StrictMode>
        <ContextualMenuExample />
      </React.StrictMode>,
    );

    expect(queryAllByRole('menu').length).toBe(0);

    const menuTrigger = getByRole('button');
    userEvent.click(menuTrigger);

    expect(queryAllByRole('menu').length).toBe(1);
  });
});
