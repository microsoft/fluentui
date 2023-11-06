import * as React from 'react';
import { render } from '@testing-library/react';
import { InteractionTag } from './InteractionTag';
import { isConformant } from '../../testing/isConformant';
import { InteractionTagPrimary } from '../InteractionTagPrimary';
import { InteractionTagSecondary } from '../InteractionTagSecondary';

const requiredProps = {
  children: 'test',
};

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
  });

  it('should set aria-labelledby with ids of InteractionTagPrimary and InteractionTagSecondary', () => {
    const { getByTestId } = render(
      <InteractionTag>
        <InteractionTagPrimary>{'tag'}</InteractionTagPrimary>
        <InteractionTagSecondary data-testid="secondary" aria-label="remove" />
      </InteractionTag>,
    );
    expect(getByTestId('secondary').getAttribute('aria-labelledby')).toMatch(
      /fui-InteractionTagPrimary-\d+ fui-InteractionTagSecondary-\d+/,
    );
  });
});
