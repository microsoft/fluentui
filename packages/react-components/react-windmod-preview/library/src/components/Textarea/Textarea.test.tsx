import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Textarea } from './Textarea';
import type { TextareaState } from './Textarea.types';
import { textareaClassNames, useTextareaStyles } from './useTextareaStyles';

import styles from './Textarea.module.css';

const appearances = ['outline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const resizes = ['none', 'horizontal', 'vertical', 'both'] as const;

const resizeClasses: Record<(typeof resizes)[number], string> = {
  none: styles.resizeNone,
  horizontal: styles.resizeHorizontal,
  vertical: styles.resizeVertical,
  both: styles.resizeBoth,
};

const appearanceClasses = [styles.filled, styles.filledDarker, styles.filledLighter, styles.outline];

// `textarea` is the primary slot, so every native prop — data-testid included — lands on the
// <textarea>; the root is only reachable through the container.
const renderTextarea = (props: React.ComponentProps<typeof Textarea> = {}) => {
  const { container } = render(<Textarea {...props} />);
  const root = container.firstElementChild as HTMLElement;

  return { root, textarea: root.querySelector<HTMLTextAreaElement>('textarea')! };
};

describe('Textarea', () => {
  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderTextarea();

    expect(root).toHaveClass('fui-textarea');
    expect(root).toHaveClass('group/fui-textarea');
    expect(root.classList[0]).toBe('fui-textarea');
    expect(textareaClassNames.root).toBe('fui-textarea group/fui-textarea');
  });

  it('applies one module class per slot', () => {
    const { root, textarea } = renderTextarea();

    expect(root).toHaveClass(styles.root);
    expect(root).not.toHaveClass(styles.textarea);
    expect(textarea).toHaveClass(styles.textarea);
    expect(textarea).not.toHaveClass(styles.root);
  });

  it('renders a span root wrapping exactly one textarea', () => {
    const { root, textarea } = renderTextarea();

    expect(root.tagName).toBe('SPAN');
    expect(root.children).toHaveLength(1);
    expect(root.children[0]).toBe(textarea);
  });

  it('maps every appearance onto its own class set, at every size', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [styles.outline, styles.outlineInteractive],
      'filled-darker': [styles.filledDarker, styles.filled],
      'filled-lighter': [styles.filledLighter, styles.filled],
    };

    const all = [...appearanceClasses, styles.outlineInteractive, styles.disabled];

    appearances.forEach(appearance => {
      sizes.forEach(size => {
        const { root } = renderTextarea({ appearance, size });

        expect(root.getAttribute('data-size')).toBe(size);
        expect(root).toHaveClass(styles.interactive);
        expected[appearance].forEach(className => expect(root).toHaveClass(className));
        all
          .filter(className => !expected[appearance].includes(className))
          .forEach(className => expect(root).not.toHaveClass(className));
      });
    });
  });

  it('defaults to the outline appearance at the medium size', () => {
    const { root } = renderTextarea();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).toHaveClass(styles.outline);
    expect(root).toHaveClass(styles.outlineInteractive);
    expect(root).not.toHaveClass(styles.filled);
    expect(root).not.toHaveClass(styles.filledDarker);
    expect(root).not.toHaveClass(styles.filledLighter);
  });

  it('carries the focus-underline class for every enabled appearance', () => {
    appearances.forEach(appearance => {
      expect(renderTextarea({ appearance }).root).toHaveClass(styles.interactive);
    });
  });

  it('drops every appearance and interactive class when disabled', () => {
    appearances.forEach(appearance => {
      const { root } = renderTextarea({ appearance, disabled: true });

      expect(root).toHaveClass(styles.disabled);
      expect(root).not.toHaveClass(styles.interactive);
      expect(root).not.toHaveClass(styles.outlineInteractive);
      appearanceClasses.forEach(className => expect(root).not.toHaveClass(className));
    });
  });

  it('gates the invalid look on aria-invalid resolving to true, not on the headless attribute', () => {
    const truthy = renderTextarea({ 'aria-invalid': true }).root;

    expect(truthy).toHaveClass(styles.invalid);
    expect(truthy.getAttribute('data-invalid')).toBe('');

    const stringTrue = renderTextarea({ 'aria-invalid': 'true' }).root;

    expect(stringTrue).toHaveClass(styles.invalid);
    expect(stringTrue.getAttribute('data-invalid')).toBe('');

    const grammar = renderTextarea({ 'aria-invalid': 'grammar' }).root;

    expect(grammar).not.toHaveClass(styles.invalid);
    expect(grammar.getAttribute('data-invalid')).toBe('grammar');

    const off = renderTextarea({ 'aria-invalid': false }).root;

    expect(off).not.toHaveClass(styles.invalid);
    expect(off.hasAttribute('data-invalid')).toBe(false);

    const absent = renderTextarea().root;

    expect(absent).not.toHaveClass(styles.invalid);
    expect(absent.hasAttribute('data-invalid')).toBe(false);
  });

  it('gives the disabled look precedence over the invalid one', () => {
    const { root } = renderTextarea({ 'aria-invalid': true, disabled: true });

    expect(root).toHaveClass(styles.disabled);
    expect(root).not.toHaveClass(styles.invalid);
    expect(root.getAttribute('data-disabled')).toBe('');
  });

  it('stamps data-disabled only while disabled', () => {
    expect(renderTextarea().root.hasAttribute('data-disabled')).toBe(false);
    expect(renderTextarea({ disabled: true }).root.getAttribute('data-disabled')).toBe('');
  });

  it('stamps data-size on the root alone', () => {
    sizes.forEach(size => {
      const { root, textarea } = renderTextarea({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(textarea.hasAttribute('data-size')).toBe(false);
    });

    // The stamp is what the size variants select on, so a root shorthand must not displace it.
    const { root } = renderTextarea({ root: { 'data-size': 'small' }, size: 'large' } as React.ComponentProps<
      typeof Textarea
    >);

    expect(root.getAttribute('data-size')).toBe('large');
  });

  it('maps every resize value onto its own class on the textarea', () => {
    const all = Object.values(resizeClasses);

    resizes.forEach(resize => {
      const { root, textarea } = renderTextarea({ resize });

      expect(root.getAttribute('data-resize')).toBe(resize);
      expect(textarea).toHaveClass(resizeClasses[resize]);
      all
        .filter(className => className !== resizeClasses[resize])
        .forEach(className => expect(textarea).not.toHaveClass(className));
    });
  });

  it('resolves resize to none by default', () => {
    const { root, textarea } = renderTextarea();

    expect(root.getAttribute('data-resize')).toBe('none');
    expect(textarea).toHaveClass(styles.resizeNone);
    expect(textarea).not.toHaveClass(styles.resizeBoth);
  });

  it('keeps the resize class while disabled, for every resize value', () => {
    const all = Object.values(resizeClasses);

    resizes.forEach(resize => {
      const { textarea } = renderTextarea({ disabled: true, resize });

      expect(textarea).toHaveClass(resizeClasses[resize]);
      all
        .filter(className => className !== resizeClasses[resize])
        .forEach(className => expect(textarea).not.toHaveClass(className));
    });
  });

  it('passes native props through to the textarea', () => {
    const { root, textarea } = renderTextarea({
      'data-native': '',
      cols: 12,
      placeholder: 'ph',
      readOnly: true,
      required: true,
      rows: 5,
    } as React.ComponentProps<typeof Textarea>);

    expect(textarea.getAttribute('data-native')).toBe('');
    expect(textarea.placeholder).toBe('ph');
    expect(textarea.readOnly).toBe(true);
    expect(textarea.required).toBe(true);
    expect(textarea.rows).toBe(5);
    expect(textarea.cols).toBe(12);
    expect(root.hasAttribute('data-native')).toBe(false);
  });

  it('passes the uncontrolled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { textarea } = renderTextarea({ defaultValue: 'a', onChange });

    expect(textarea.value).toBe('a');

    fireEvent.change(textarea, { target: { value: 'ab' } });

    expect(textarea.value).toBe('ab');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'ab' });
  });

  it('passes the controlled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { textarea } = renderTextarea({ onChange, value: 'a' });

    expect(textarea.value).toBe('a');

    fireEvent.change(textarea, { target: { value: 'ab' } });

    expect(textarea.value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'ab' });
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root, textarea } = renderTextarea({ className: 'consumer' });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(root).toHaveClass(styles.root);
    expect(textarea).not.toHaveClass('consumer');
  });

  it('keeps the resolved slot props of the textarea shorthand', () => {
    const { textarea } = renderTextarea({ textarea: { className: 'x', id: 'field' } });

    expect(textarea).toHaveClass(styles.textarea);
    expect(textarea).toHaveClass('x');
    expect(textarea.id).toBe('field');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled-darker',
      components: { root: 'span', textarea: 'textarea' },
      resize: 'both',
      root: { className: 'consumer' },
      size: 'large',
      textarea: { 'aria-invalid': true, className: 'native', disabled: false },
    } as unknown as TextareaState;

    const styled = useTextareaStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.textarea).not.toBe(state.textarea);

    expect(state.root.className).toBe('consumer');
    expect(state.textarea.className).toBe('native');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.textarea.className).toContain('native');
  });
});
