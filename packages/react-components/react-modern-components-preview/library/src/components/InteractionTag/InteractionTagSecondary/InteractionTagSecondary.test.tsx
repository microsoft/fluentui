import * as React from 'react';
import { render } from '@testing-library/react';
import { InteractionTag } from '../InteractionTag/InteractionTag';
import { InteractionTagPrimary } from '../InteractionTagPrimary';
import { InteractionTagSecondary, interactionTagSecondaryClassNames } from './';

describe('InteractionTagSecondary', () => {
  it('renders inherited visual state, a default icon, and consumer classes', () => {
    const { getByLabelText } = render(
      <InteractionTag appearance="brand" shape="circular" size="extra-small">
        <InteractionTagPrimary>Primary</InteractionTagPrimary>
        <InteractionTagSecondary aria-label="Dismiss" className="consumer-class" />
      </InteractionTag>,
    );
    const root = getByLabelText('Dismiss');

    expect(root).toHaveClass(interactionTagSecondaryClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-appearance', 'brand');
    expect(root).toHaveAttribute('data-shape', 'circular');
    expect(root).toHaveAttribute('data-size', 'extra-small');
    expect(root.querySelector('[data-default-icon]')).not.toBeNull();
  });
});
