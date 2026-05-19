import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { InteractionTagSecondary } from './InteractionTagSecondary';
import { InteractionTag } from '../InteractionTag';
import { InteractionTagPrimary } from '../InteractionTagPrimary';

const wrap = (ui: React.ReactNode) =>
  render(
    <InteractionTag>
      <InteractionTagPrimary>p</InteractionTagPrimary>
      {ui}
    </InteractionTag>,
  );

describe('InteractionTagSecondary', () => {
  isConformant({
    Component: InteractionTagSecondary,
    displayName: 'InteractionTagSecondary',
    requiredProps: { 'aria-label': 'dismiss' },
  });

  it('does NOT render a default dismiss icon (headless)', () => {
    const result = wrap(<InteractionTagSecondary data-testid="sec" aria-label="dismiss" />);
    const sec = result.getByTestId('sec');
    expect(sec.children).toHaveLength(0);
  });
});
