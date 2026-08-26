import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Listbox } from '../Listbox/Listbox';
import { Option } from '../Option/Option';
import { OptionGroup } from './OptionGroup';
import type { OptionGroupState } from './OptionGroup.types';
import { optionGroupClassNames, useOptionGroupStyles } from './useOptionGroupStyles';

import styles from './OptionGroup.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/combobox', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/combobox');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useOptionGroup: (...args: Parameters<typeof actual.useOptionGroup>) =>
      deepFreezeState(actual.useOptionGroup(...args)),
  };
});

const renderOptionGroup = (props: React.ComponentProps<typeof OptionGroup> = {}) => {
  const { container } = render(<OptionGroup {...props} />);

  return container.firstElementChild as HTMLElement;
};

describe('OptionGroup', () => {
  isConformant({
    Component: OptionGroup,
    displayName: 'OptionGroup',
  });

  it('stamps the marker pair on the root', () => {
    const root = renderOptionGroup();

    expect(root).toHaveClass('fui-option-group');
    expect(root).toHaveClass('group/fui-option-group');
    expect(root.classList[0]).toBe('fui-option-group');
    expect(optionGroupClassNames.root).toBe('fui-option-group group/fui-option-group');
  });

  it('applies one module class per slot', () => {
    const root = renderOptionGroup({ label: 'Fruits' });
    const label = root.querySelector<HTMLElement>(`.${styles.label}`);

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveAttribute('role', 'group');
    expect(label).not.toBeNull();
    expect(label).not.toHaveClass(styles.root);
    expect(label!.textContent).toBe('Fruits');
    expect(label!.getAttribute('role')).toBe('presentation');
  });

  it('renders no label element when the slot is absent', () => {
    expect(renderOptionGroup().querySelector(`.${styles.label}`)).toBeNull();
  });

  // The separator is the root's :not(:last-child)::after, so a lone group cannot draw one and a
  // last group cannot either. Only the structural position is assertable in jsdom; the pixels are
  // the combobox-listbox VR scene's job.
  it('places every group as a sibling so the last-child separator rule can discriminate', () => {
    const { container } = render(
      <Listbox>
        <OptionGroup label="A">
          <Option value="a">A1</Option>
        </OptionGroup>
        <OptionGroup label="B">
          <Option value="b">B1</Option>
        </OptionGroup>
      </Listbox>,
    );

    // The jest css-module proxy drops the component segment, so OptionGroup's `root` and Listbox's
    // `root` are the same string; the groups are reached by their marker class instead.
    const groups = Array.from(container.querySelectorAll<HTMLElement>('.fui-option-group'));

    expect(groups).toHaveLength(2);
    expect(groups[0].nextElementSibling).toBe(groups[1]);
    expect(groups[1].nextElementSibling).toBeNull();
  });

  it('does not mutate the state it is given', () => {
    const state = {
      label: { className: 'label' },
      root: { className: 'consumer' },
    } as unknown as OptionGroupState;

    const styled = useOptionGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.label).not.toBe(state.label);
    expect(state.root.className).toBe('consumer');
    expect(state.label!.className).toBe('label');
    expect(styled.root.className).toContain('consumer');
    expect(styled.label!.className).toContain('label');
    expect(styled.label!.className).toContain(styles.label);
  });
});
