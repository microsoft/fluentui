import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setUpWhatInput } from '../../../src/utils/whatInput';

describe('whatInput', () => {
  // https://github.com/microsoft/fluentui/issues/19233
  it('should not crash with testing-library', () => {
    setUpWhatInput(document);
    const { getByRole } = render(<button>Button</button>);
    userEvent.click(getByRole('button'));
  });
});
