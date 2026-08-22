import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Input } from './Input';
import type { InputState } from './Input.types';
import { inputClassNames, useInputStyles } from './useInputStyles';

import styles from './Input.module.css';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const parts = (root: HTMLElement) => ({
  root,
  input: root.querySelector<HTMLInputElement>('input')!,
  content: root.querySelectorAll<HTMLElement>(`.${styles.content}`),
});

// `input` is the primary slot, so every native prop — data-testid included — lands on the
// <input>; the root is only reachable through the container.
const renderInput = (props: React.ComponentProps<typeof Input> = {}) => {
  const { container } = render(<Input {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

describe('Input', () => {
  isConformant({
    Component: Input,
    displayName: 'Input',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderInput();

    expect(root).toHaveClass('fui-input');
    expect(root).toHaveClass('group/fui-input');
    expect(root.classList[0]).toBe('fui-input');
    expect(inputClassNames.root).toBe('fui-input group/fui-input');
  });

  it('applies one module class per slot', () => {
    const { root, input, content } = renderInput({ contentBefore: <i />, contentAfter: <i /> });

    expect(root).toHaveClass(styles.root);
    expect(input).toHaveClass(styles.input);
    expect(input).not.toHaveClass(styles.root);
    expect(content).toHaveLength(2);
    content.forEach(span => {
      expect(span).toHaveClass(styles.content);
      expect(span).not.toHaveClass(styles.input);
    });
  });

  it('maps every appearance onto its own class set', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [styles.outlineInteractive],
      underline: [styles.underline, styles.underlineInteractive],
      'filled-darker': [styles.filledDarker, styles.filled, styles.filledInteractive],
      'filled-lighter': [styles.filledLighter, styles.filled, styles.filledInteractive],
    };

    const all = [
      styles.underline,
      styles.underlineInteractive,
      styles.filledDarker,
      styles.filledLighter,
      styles.filled,
      styles.filledInteractive,
      styles.outlineInteractive,
    ];

    appearances.forEach(appearance => {
      sizes.forEach(size => {
        const { root } = renderInput({ appearance, size });

        expect(root.getAttribute('data-size')).toBe(size);
        expected[appearance].forEach(className => expect(root).toHaveClass(className));
        all
          .filter(className => !expected[appearance].includes(className))
          .forEach(className => expect(root).not.toHaveClass(className));
      });
    });
  });

  it('defaults to the outline appearance at the medium size', () => {
    const { root } = renderInput();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).toHaveClass(styles.outlineInteractive);
    expect(root).not.toHaveClass(styles.underline);
    expect(root).not.toHaveClass(styles.filled);
    expect(root).not.toHaveClass(styles.filledDarker);
    expect(root).not.toHaveClass(styles.filledLighter);
  });

  it('drops every interactive class when disabled', () => {
    appearances.forEach(appearance => {
      const { root } = renderInput({ appearance, disabled: true });

      expect(root).toHaveClass(styles.disabled);
      expect(root).not.toHaveClass(styles.outlineInteractive);
      expect(root).not.toHaveClass(styles.underlineInteractive);
      expect(root).not.toHaveClass(styles.filledInteractive);
    });
  });

  it('keeps the resting appearance classes when disabled', () => {
    expect(renderInput({ appearance: 'underline', disabled: true }).root).toHaveClass(styles.underline);
    expect(renderInput({ appearance: 'filled-darker', disabled: true }).root).toHaveClass(styles.filledDarker);
    expect(renderInput({ appearance: 'filled-darker', disabled: true }).root).toHaveClass(styles.filled);
  });

  it('gates the invalid look on aria-invalid resolving to true, not on the headless attribute', () => {
    const truthy = renderInput({ 'aria-invalid': true }).root;

    expect(truthy).toHaveClass(styles.invalid);
    expect(truthy.getAttribute('data-invalid')).toBe('');

    const stringTrue = renderInput({ 'aria-invalid': 'true' }).root;

    expect(stringTrue).toHaveClass(styles.invalid);
    expect(stringTrue.getAttribute('data-invalid')).toBe('');

    const grammar = renderInput({ 'aria-invalid': 'grammar' }).root;

    expect(grammar).not.toHaveClass(styles.invalid);
    expect(grammar.getAttribute('data-invalid')).toBe('grammar');

    const off = renderInput({ 'aria-invalid': false }).root;

    expect(off).not.toHaveClass(styles.invalid);
    expect(off.hasAttribute('data-invalid')).toBe(false);

    const absent = renderInput().root;

    expect(absent).not.toHaveClass(styles.invalid);
    expect(absent.hasAttribute('data-invalid')).toBe(false);
  });

  it('gives the disabled look precedence over the invalid one', () => {
    const { root } = renderInput({ 'aria-invalid': true, disabled: true });

    expect(root).toHaveClass(styles.disabled);
    expect(root).not.toHaveClass(styles.invalid);
    expect(root.getAttribute('data-disabled')).toBe('');
  });

  it('stamps data-disabled only while disabled', () => {
    expect(renderInput().root.hasAttribute('data-disabled')).toBe(false);
    expect(renderInput({ disabled: true }).root.getAttribute('data-disabled')).toBe('');
  });

  it('stamps data-size on the root alone', () => {
    sizes.forEach(size => {
      const { root, input, content } = renderInput({ size, contentBefore: <i />, contentAfter: <i /> });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(input.hasAttribute('data-size')).toBe(false);
      content.forEach(span => expect(span.hasAttribute('data-size')).toBe(false));
    });
  });

  it('stamps a content attribute per present content slot', () => {
    const bare = renderInput().root;

    expect(bare.hasAttribute('data-content-before')).toBe(false);
    expect(bare.hasAttribute('data-content-after')).toBe(false);

    const before = renderInput({ contentBefore: <i /> }).root;

    expect(before.getAttribute('data-content-before')).toBe('true');
    expect(before.hasAttribute('data-content-after')).toBe(false);

    const after = renderInput({ contentAfter: <i /> }).root;

    expect(after.hasAttribute('data-content-before')).toBe(false);
    expect(after.getAttribute('data-content-after')).toBe('true');

    const both = renderInput({ contentBefore: <i />, contentAfter: <i /> }).root;

    expect(both.getAttribute('data-content-before')).toBe('true');
    expect(both.getAttribute('data-content-after')).toBe('true');
  });

  it('renders no content span for a null slot', () => {
    const { root, content } = renderInput({ contentBefore: null, contentAfter: null });

    expect(content).toHaveLength(0);
    expect(root.hasAttribute('data-content-before')).toBe(false);
    expect(root.hasAttribute('data-content-after')).toBe(false);
  });

  it('keeps the resolved slot props of a content shorthand', () => {
    const { content } = renderInput({
      contentBefore: { children: <i data-glyph="" />, className: 'x', id: 'before' },
    });

    expect(content).toHaveLength(1);
    expect(content[0]).toHaveClass(styles.content);
    expect(content[0]).toHaveClass('x');
    expect(content[0].id).toBe('before');
    expect(content[0].querySelector('[data-glyph]')).not.toBeNull();
  });

  it('renders the content slots around the input', () => {
    const { root, input } = renderInput({ contentBefore: <i data-before="" />, contentAfter: <i data-after="" /> });
    const children = Array.from(root.children);

    expect(children).toHaveLength(3);
    expect(children[0].querySelector('[data-before]')).not.toBeNull();
    expect(children[1]).toBe(input);
    expect(children[2].querySelector('[data-after]')).not.toBeNull();
  });

  it('passes native props through to the input', () => {
    const { root, input } = renderInput({
      'data-native': '',
      placeholder: 'ph',
      required: true,
      type: 'password',
    } as React.ComponentProps<typeof Input>);

    expect(input.getAttribute('data-native')).toBe('');
    expect(input.placeholder).toBe('ph');
    expect(input.required).toBe(true);
    expect(input.type).toBe('password');
    expect(root.hasAttribute('data-native')).toBe(false);
    expect(renderInput().input.type).toBe('text');
  });

  it('passes the uncontrolled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { input } = renderInput({ defaultValue: 'a', onChange });

    expect(input.value).toBe('a');

    fireEvent.change(input, { target: { value: 'ab' } });

    expect(input.value).toBe('ab');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'ab' });
  });

  it('passes the controlled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { input } = renderInput({ value: 'a', onChange });

    expect(input.value).toBe('a');

    fireEvent.change(input, { target: { value: 'ab' } });

    expect(input.value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'ab' });
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root, input } = renderInput({ className: 'consumer' });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(input).not.toHaveClass('consumer');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled-darker',
      components: { root: 'span', input: 'input', contentBefore: 'span', contentAfter: 'span' },
      contentAfter: { className: 'after' },
      contentBefore: { className: 'before' },
      input: { 'aria-invalid': true, className: 'native', disabled: false },
      root: { className: 'consumer' },
      size: 'large',
    } as unknown as InputState;

    const styled = useInputStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.contentBefore).not.toBe(state.contentBefore);
    expect(styled.contentAfter).not.toBe(state.contentAfter);

    expect(state.root.className).toBe('consumer');
    expect(state.input.className).toBe('native');
    expect(state.contentBefore!.className).toBe('before');
    expect(state.contentAfter!.className).toBe('after');
    expect('data-size' in state.root).toBe(false);
    expect('data-content-before' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.input.className).toContain('native');
    expect(styled.contentBefore!.className).toContain('before');
    expect(styled.contentAfter!.className).toContain('after');
  });
});
