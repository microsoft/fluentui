import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Listbox } from './Listbox';
import type { ListboxState } from './Listbox.types';
import { listboxClassNames, useListboxStyles } from './useListboxStyles';

import styles from './Listbox.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/combobox', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/combobox');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useListbox: (...args: Parameters<typeof actual.useListbox>) => deepFreezeState(actual.useListbox(...args)),
  };
});

const renderListbox = (props: React.ComponentProps<typeof Listbox> = {}) => {
  const { container } = render(<Listbox {...props} />);

  return container.firstElementChild as HTMLElement;
};

describe('Listbox', () => {
  isConformant({
    Component: Listbox,
    displayName: 'Listbox',
  });

  it('stamps the marker pair on the root', () => {
    const root = renderListbox();

    expect(root).toHaveClass('fui-listbox');
    expect(root).toHaveClass('group/fui-listbox');
    expect(root.classList[0]).toBe('fui-listbox');
    expect(listboxClassNames.root).toBe('fui-listbox group/fui-listbox');
  });

  it('applies its module class to the root', () => {
    expect(renderListbox()).toHaveClass(styles.root);
  });

  it('keeps the headless popover promotion and a consumer override of it', () => {
    expect(renderListbox().getAttribute('popover')).toBe('auto');
    expect(renderListbox({ popover: 'manual' }).getAttribute('popover')).toBe('manual');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const root = renderListbox({ className: 'consumer' });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
  });

  it('does not mutate the state it is given', () => {
    const state = { root: { className: 'consumer' } } as unknown as ListboxState;

    const styled = useListboxStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(styles.root);
  });
});
