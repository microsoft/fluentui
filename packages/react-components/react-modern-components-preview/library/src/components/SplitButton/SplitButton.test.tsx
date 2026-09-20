import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file'],
    requiredProps: { children: 'Split button' },
  });

  it('renders a default state', () => {
    const result = render(<SplitButton>Default SplitButton</SplitButton>);
    expect(result.container).toMatchSnapshot();
  });
});
