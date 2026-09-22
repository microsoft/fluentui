import * as React from 'react';
import { render } from '@testing-library/react';
import { InteractionTag } from '../InteractionTag/InteractionTag';
import { InteractionTagPrimary, interactionTagPrimaryClassNames } from './';

describe('InteractionTagPrimary', () => {
  it('renders inherited visual state, slots, and consumer classes', () => {
    const { getByRole } = render(
      <InteractionTag appearance="outline" shape="circular" size="small">
        <InteractionTagPrimary className="consumer-class" icon="icon" secondaryText="Secondary">
          Primary
        </InteractionTagPrimary>
      </InteractionTag>,
    );
    const root = getByRole('button');

    expect(root).toHaveClass(interactionTagPrimaryClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-appearance', 'outline');
    expect(root).toHaveAttribute('data-shape', 'circular');
    expect(root).toHaveAttribute('data-size', 'small');
  });
});
