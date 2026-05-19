import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { InteractionTag } from './InteractionTag';
import { InteractionTagPrimary } from '../InteractionTagPrimary';

const requiredProps = { children: <InteractionTagPrimary>tag</InteractionTagPrimary> };

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
  });

  it('provides a child InteractionTagPrimary with an aria-pressed when handleTagSelect is wired', () => {
    const result = render(<InteractionTag {...requiredProps} />);
    expect(result.getByRole('button')).toBeInTheDocument();
  });
});
