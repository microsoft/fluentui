import * as React from 'react';
import { render } from '@testing-library/react';

import { Label } from './Label';
import { isConformant } from '../../testing/isConformant';
import type { LabelState } from './Label.types';
import { labelClassNames, useLabelStyles } from './useLabelStyles';

describe('Label', () => {
  isConformant({
    Component: Label,
    displayName: 'Label',
    requiredProps: { children: "I'm a label." },
  });

  it('stamps data-size and the marker class', () => {
    const { getByText } = render(
      <>
        <Label>Default</Label>
        <Label size="large">Large</Label>
      </>,
    );

    expect(getByText('Default').getAttribute('data-size')).toBe('medium');
    expect(getByText('Large').getAttribute('data-size')).toBe('large');
    expect(getByText('Default').className).toContain(labelClassNames.root);
    expect(getByText('Default')).toHaveClass('fui-label');
    expect(getByText('Default')).toHaveClass('group/fui-label');
    expect(getByText('Default').classList[0]).toBe('fui-label');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'label', required: 'span' },
      disabled: false,
      required: { as: 'span' },
      root: { as: 'label', className: 'consumer' },
      size: 'medium',
      weight: 'semibold',
    } as unknown as LabelState;

    const styled = useLabelStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
