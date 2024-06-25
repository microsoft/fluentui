import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { PromptInput } from './PromptInput';

describe('PromptInput', () => {
  isConformant({
    Component: PromptInput,
    displayName: 'PromptInput',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PromptInput>Default PromptInput</PromptInput>);
    expect(result.container).toMatchSnapshot();
  });
});
