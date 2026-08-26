import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Select } from './Select';
import type { SelectState } from './Select.types';
import { selectClassNames, useSelectStyles } from './useSelectStyles';

import styles from './Select.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/select', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/select');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useSelect: (...args: Parameters<typeof actual.useSelect>) => deepFreezeState(actual.useSelect(...args)),
  };
});

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const options = [
  <option key="a" value="a">
    Apple
  </option>,
  <option key="b" value="b">
    Banana
  </option>,
];

// `select` is the primary slot, so every native prop — data-testid included — lands on the
// <select>; the root is only reachable through the container. The icon span is the root's second
// element child, read structurally so a dropped module class cannot hide it.
const parts = (root: HTMLElement) => ({
  root,
  select: root.querySelector<HTMLSelectElement>('select')!,
  icon: (root.children[1] as HTMLElement | undefined) ?? null,
});

const renderSelect = (props: React.ComponentProps<typeof Select> = {}) => {
  const { container } = render(<Select {...props}>{options}</Select>);

  return parts(container.firstElementChild as HTMLElement);
};

describe('Select', () => {
  isConformant({
    Component: Select,
    displayName: 'Select',
    primarySlot: 'select',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderSelect();

    expect(root).toHaveClass('fui-select');
    expect(root).toHaveClass('group/fui-select');
    expect(root.classList[0]).toBe('fui-select');
    expect(selectClassNames.root).toBe('fui-select group/fui-select');
  });

  it('applies one module class per slot', () => {
    const { root, select, icon } = renderSelect();

    expect(root).toHaveClass(styles.root);
    expect(select).toHaveClass(styles.select);
    expect(select).not.toHaveClass(styles.root);
    expect(icon).toHaveClass(styles.icon);
    expect(icon).not.toHaveClass(styles.select);
  });

  it('restores the chevron glyph by default', () => {
    const { icon } = renderSelect();

    expect(icon).not.toBeNull();
    expect(icon!.querySelector('svg')).not.toBeNull();
  });

  it('removes the icon slot for icon={null}', () => {
    const { root, icon } = renderSelect({ icon: null });

    expect(icon).toBeNull();
    expect(root.children).toHaveLength(1);
    expect(root.querySelector('svg')).toBeNull();
  });

  it('lets a consumer glyph win over the chevron', () => {
    const { icon } = renderSelect({ icon: <i data-custom="" /> });

    expect(icon!.querySelector('[data-custom]')).not.toBeNull();
    expect(icon!.querySelector('svg')).toBeNull();
  });

  it('lets a consumer string shorthand win over the chevron', () => {
    const { icon } = renderSelect({ icon: 'custom' });

    expect(icon!.textContent).toBe('custom');
    expect(icon!.querySelector('svg')).toBeNull();
  });

  it('keeps both the resolved slot props and the chevron for a childless icon object', () => {
    const { icon } = renderSelect({ icon: { className: 'x', id: 'chevron' } });

    expect(icon).toHaveClass(styles.icon);
    expect(icon).toHaveClass('x');
    expect(icon!.id).toBe('chevron');
    expect(icon!.querySelector('svg')).not.toBeNull();
  });

  it('keeps the chevron for icon={{ children: undefined }}', () => {
    const { icon } = renderSelect({ icon: { children: undefined } });

    expect(icon!.querySelector('svg')).not.toBeNull();
  });

  it('keeps the chevron for icon={{ children: null }}', () => {
    const { icon } = renderSelect({ icon: { children: null } });

    expect(icon!.querySelector('svg')).not.toBeNull();
  });

  it('maps every appearance onto its own class set at every size', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [styles.outline, styles.outlineInteractive],
      underline: [styles.underline],
      'filled-darker': [styles.filledDarker],
      'filled-lighter': [styles.filledLighter],
    };

    const all = [
      styles.outline,
      styles.outlineInteractive,
      styles.underline,
      styles.filledDarker,
      styles.filledLighter,
    ];

    appearances.forEach(appearance => {
      sizes.forEach(size => {
        const { root, select } = renderSelect({ appearance, size });

        expect(root.getAttribute('data-size')).toBe(size);
        expected[appearance].forEach(className => expect(select).toHaveClass(className));
        all
          .filter(className => !expected[appearance].includes(className))
          .forEach(className => expect(select).not.toHaveClass(className));
      });
    });
  });

  it('defaults to the outline appearance at the medium size', () => {
    const { root, select } = renderSelect();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(select).toHaveClass(styles.outline);
    expect(select).toHaveClass(styles.outlineInteractive);
    expect(select).not.toHaveClass(styles.underline);
    expect(select).not.toHaveClass(styles.filledDarker);
    expect(select).not.toHaveClass(styles.filledLighter);
  });

  it('drops every interactive and invalid class when disabled', () => {
    appearances.forEach(appearance => {
      const { select } = renderSelect({ appearance, disabled: true, 'aria-invalid': true });

      expect(select).toHaveClass(styles.disabled);
      expect(select).not.toHaveClass(styles.outlineInteractive);
      expect(select).not.toHaveClass(styles.invalid);
      expect(select).not.toHaveClass(styles.invalidUnderline);
    });
  });

  it('gates the invalid look on aria-invalid resolving to true, not on the headless attribute', () => {
    const truthy = renderSelect({ 'aria-invalid': true });

    expect(truthy.select).toHaveClass(styles.invalid);
    expect(truthy.root.getAttribute('data-invalid')).toBe('');

    const stringTrue = renderSelect({ 'aria-invalid': 'true' });

    expect(stringTrue.select).toHaveClass(styles.invalid);
    expect(stringTrue.root.getAttribute('data-invalid')).toBe('');

    const grammar = renderSelect({ 'aria-invalid': 'grammar' });

    expect(grammar.select).not.toHaveClass(styles.invalid);
    expect(grammar.select).not.toHaveClass(styles.invalidUnderline);
    expect(grammar.root.getAttribute('data-invalid')).toBe('grammar');

    const off = renderSelect({ 'aria-invalid': false });

    expect(off.select).not.toHaveClass(styles.invalid);
    expect(off.root.hasAttribute('data-invalid')).toBe(false);

    const absent = renderSelect();

    expect(absent.select).not.toHaveClass(styles.invalid);
    expect(absent.root.hasAttribute('data-invalid')).toBe(false);
  });

  it('branches the invalid look on the underline appearance', () => {
    const underline = renderSelect({ appearance: 'underline', 'aria-invalid': true });

    expect(underline.select).toHaveClass(styles.invalidUnderline);
    expect(underline.select).not.toHaveClass(styles.invalid);

    appearances
      .filter(appearance => appearance !== 'underline')
      .forEach(appearance => {
        const { select } = renderSelect({ appearance, 'aria-invalid': true });

        expect(select).toHaveClass(styles.invalid);
        expect(select).not.toHaveClass(styles.invalidUnderline);
      });
  });

  it('branches the disabled look on the underline appearance', () => {
    const underline = renderSelect({ appearance: 'underline', disabled: true });

    expect(underline.select).toHaveClass(styles.disabled);
    expect(underline.select).toHaveClass(styles.disabledUnderline);

    appearances
      .filter(appearance => appearance !== 'underline')
      .forEach(appearance => {
        const { select } = renderSelect({ appearance, disabled: true });

        expect(select).toHaveClass(styles.disabled);
        expect(select).not.toHaveClass(styles.disabledUnderline);
      });
  });

  it('gives the disabled look precedence over the invalid one', () => {
    const { root, select } = renderSelect({ 'aria-invalid': true, disabled: true });

    expect(select).toHaveClass(styles.disabled);
    expect(select).not.toHaveClass(styles.invalid);
    expect(root.getAttribute('data-disabled')).toBe('');
  });

  it('stamps data-disabled only while disabled', () => {
    expect(renderSelect().root.hasAttribute('data-disabled')).toBe(false);
    expect(renderSelect({ disabled: true }).root.getAttribute('data-disabled')).toBe('');
  });

  it('stamps data-size on the root alone', () => {
    sizes.forEach(size => {
      const { root, select, icon } = renderSelect({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(select.hasAttribute('data-size')).toBe(false);
      expect(icon!.hasAttribute('data-size')).toBe(false);
    });
  });

  it('renders the children as the options of the select', () => {
    const { root, select } = renderSelect();

    expect(select.options).toHaveLength(2);
    expect(select.options[0]).toHaveTextContent('Apple');
    expect(root.querySelectorAll(':scope > option')).toHaveLength(0);
  });

  it('passes the uncontrolled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { select } = renderSelect({ defaultValue: 'b', onChange });

    expect(select.value).toBe('b');

    fireEvent.change(select, { target: { value: 'a' } });

    expect(select.value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'a' });
  });

  it('passes the controlled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { select } = renderSelect({ value: 'b', onChange });

    expect(select.value).toBe('b');

    fireEvent.change(select, { target: { value: 'a' } });

    expect(select.value).toBe('b');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'a' });
  });

  it('renders the select before the icon inside the root', () => {
    const { root, select, icon } = renderSelect();

    expect(root.children).toHaveLength(2);
    expect(root.children[0]).toBe(select);
    expect(root.children[1]).toBe(icon);
  });

  it('reaches the native select size attribute only through the select slot, not the look prop', () => {
    // Griffel's own SelectProps omits the native `size` entirely, so it is reachable only via the
    // `select` slot; the look prop `size` never collides with it.
    const { select } = renderSelect({ select: { size: 4 }, size: 'small' } as React.ComponentProps<typeof Select>);

    expect(select.getAttribute('size')).toBe('4');
    expect(select.hasAttribute('data-size')).toBe(false);
  });

  it('splits native props onto the select and root props onto the root', () => {
    const { root, select } = renderSelect({
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
      multiple: true,
      required: true,
    } as React.ComponentProps<typeof Select>);

    expect(select.id).toBe('my-id');
    expect(select.required).toBe(true);
    expect(select.multiple).toBe(true);
    expect(select.getAttribute('data-testid')).toBe('t');
    expect(root.hasAttribute('data-testid')).toBe(false);
    expect(root).toHaveClass('consumer');
    expect(select).not.toHaveClass('consumer');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderSelect({ className: 'consumer' });

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
    const state = {
      appearance: 'underline',
      components: { root: 'span', select: 'select', icon: 'span' },
      icon: { className: 'glyph' },
      root: { className: 'consumer' },
      select: { 'aria-invalid': true, className: 'native', disabled: false },
      size: 'large',
    } as unknown as SelectState;

    const styled = useSelectStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.select).not.toBe(state.select);
    expect(styled.icon).not.toBe(state.icon);

    expect(state.root.className).toBe('consumer');
    expect(state.select.className).toBe('native');
    expect(state.icon!.className).toBe('glyph');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.select.className).toContain('native');
    expect(styled.icon!.className).toContain('glyph');
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => render(<Select>{options}</Select>)).not.toThrow();
    expect(() => render(<Select icon={<span data-testid="custom" />}>{options}</Select>)).not.toThrow();
    expect(() => render(<Select icon={null}>{options}</Select>)).not.toThrow();
  });
});
