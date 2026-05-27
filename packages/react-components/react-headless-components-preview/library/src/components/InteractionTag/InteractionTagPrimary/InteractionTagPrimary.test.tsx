import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { InteractionTagPrimary } from './InteractionTagPrimary';
import { InteractionTag } from '../InteractionTag';

const wrap = (ui: React.ReactNode) => render(<InteractionTag>{ui}</InteractionTag>);

describe('InteractionTagPrimary', () => {
  isConformant({
    Component: InteractionTagPrimary,
    displayName: 'InteractionTagPrimary',
    requiredProps: { children: 'tag' },
  });

  it('exposes its content as the accessible name of a button', () => {
    const result = wrap(<InteractionTagPrimary>label</InteractionTagPrimary>);
    expect(result.getByRole('button', { name: 'label' })).toBeInTheDocument();
  });
});
