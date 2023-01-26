import * as React from 'react';
import { render } from '@testing-library/react';
import { FieldMessage } from './FieldMessage';
import { isConformant } from '../../testing/isConformant';

describe('FieldMessage', () => {
  isConformant({
    Component: FieldMessage,
    displayName: 'FieldMessage',
    testOptions: {
      'has-static-classnames': [{ props: { validationState: 'error' } }],
    },
  });

  it('renders text', () => {
    const result = render(<FieldMessage>Default FieldMessage</FieldMessage>);

    expect(result.getByText('Default FieldMessage')).toBeTruthy();
  });

  it.each(['error', 'warning', 'success'] as const)('renders an icon when validationState is %s', state => {
    const result = render(<FieldMessage validationState={state}>Validation message</FieldMessage>);

    expect(result.baseElement.querySelector('svg')).toBeTruthy();
  });

  it.each([undefined, 'neutral'] as const)('does not render an icon when validationState is %s', state => {
    const result = render(<FieldMessage validationState={state}>Hint message</FieldMessage>);

    expect(result.baseElement.querySelector('svg')).toBeFalsy();
  });

  it('renders provided icon', () => {
    const result = render(<FieldMessage icon={<span data-testid="custom-icon" />}>FieldMessage</FieldMessage>);

    expect(result.getByTestId('custom-icon')).toBeTruthy();
  });
});
