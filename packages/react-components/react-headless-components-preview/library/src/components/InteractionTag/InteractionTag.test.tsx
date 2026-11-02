import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { InteractionTag } from './InteractionTag';
import { InteractionTagPrimary } from './InteractionTagPrimary';
import { TagGroup } from '../TagGroup';

const requiredProps = { children: <InteractionTagPrimary>tag</InteractionTagPrimary> };

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
  });

  it('propagates TagGroup selection so the primary button reflects aria-pressed', () => {
    const result = render(
      <TagGroup onTagSelect={jest.fn()} selectedValues={['x']}>
        <InteractionTag value="x">
          <InteractionTagPrimary>tag</InteractionTagPrimary>
        </InteractionTag>
      </TagGroup>,
    );
    expect(result.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});
