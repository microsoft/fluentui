import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { InteractionTagPrimary } from './InteractionTagPrimary';
import { InteractionTag } from '../InteractionTag';

const wrap = (ui: React.ReactNode) => render(<InteractionTag>{ui}</InteractionTag>);

describe('InteractionTagPrimary', () => {
  isConformant({
    Component: InteractionTagPrimary,
    displayName: 'InteractionTagPrimary',
    requiredProps: { children: 'tag' },
  });

  it('renders a button using the parent InteractionTag context id', () => {
    const result = wrap(<InteractionTagPrimary>label</InteractionTagPrimary>);
    const button = result.getByRole('button');
    expect(button.id).toEqual(expect.stringMatching(/fui-InteractionTagPrimary-/));
  });
});
