import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';
import { SearchRegular } from '@fluentui/react-icons/headless/svg/search';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { SearchBox } from './SearchBox';
import type { SearchBoxState } from './SearchBox.types';
import { searchBoxClassNames, useSearchBoxStyles } from './useSearchBoxStyles';

import inputStyles from '../Input/Input.module.css';
import styles from './SearchBox.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/search-box', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/search-box');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useSearchBox: (...args: Parameters<typeof actual.useSearchBox>) => deepFreezeState(actual.useSearchBox(...args)),
  };
});

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

// Every slot is read structurally: the input is the primary slot, the content spans are its
// siblings, and the dismiss span is the only [role="button"]. A dropped module class therefore
// cannot hide a slot from these assertions.
const parts = (root: HTMLElement) => {
  const input = root.querySelector<HTMLInputElement>('input')!;
  const children = Array.from(root.children) as HTMLElement[];
  const index = children.indexOf(input);

  return {
    root,
    input,
    children,
    contentBefore: index > 0 ? children[index - 1] : null,
    contentAfter: children[index + 1] ?? null,
    dismiss: root.querySelector<HTMLElement>('[role="button"]'),
  };
};

// `input` is the primary slot, so every native prop — data-testid included — lands on the
// <input>; the root is only reachable through the container.
const renderSearchBox = (props: React.ComponentProps<typeof SearchBox> = {}) => {
  const { container } = render(<SearchBox {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

describe('SearchBox', () => {
  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
    primarySlot: 'input',
  });

  it('stamps both marker pairs, its own first', () => {
    const { root } = renderSearchBox();

    expect(root).toHaveClass('fui-search-box');
    expect(root).toHaveClass('group/fui-search-box');
    expect(root).toHaveClass('fui-input');
    expect(root).toHaveClass('group/fui-input');
    expect(root.classList[0]).toBe('fui-search-box');
    expect(searchBoxClassNames.root).toBe('fui-search-box group/fui-search-box');
  });

  it('carries the root class of both stylesheets', () => {
    const { root } = renderSearchBox();

    expect(classOccurrences(root, styles.root)).toBe(2);
  });

  it('carries the input class of both stylesheets', () => {
    const { input } = renderSearchBox();

    expect(classOccurrences(input, styles.input)).toBe(2);
  });

  it('applies one module class per slot', () => {
    const { contentBefore, contentAfter, dismiss } = renderSearchBox();

    expect(contentBefore).toHaveClass(inputStyles.content);
    expect(contentBefore).not.toHaveClass(styles.contentAfter);
    expect(contentAfter).toHaveClass(styles.contentAfter);
    expect(contentAfter).toHaveClass(inputStyles.content);
    expect(dismiss).toHaveClass(styles.dismiss);
    expect(dismiss).not.toHaveClass(styles.contentAfter);
  });

  it('restores the magnifier glyph by default', () => {
    const { contentBefore } = renderSearchBox();

    expect(contentBefore).not.toBeNull();
    expect(contentBefore!.querySelector('svg')).not.toBeNull();
  });

  it('restores the dismiss glyph by default', () => {
    const { dismiss } = renderSearchBox();

    expect(dismiss).not.toBeNull();
    expect(dismiss!.querySelector('svg')).not.toBeNull();
  });

  it('restores each slot its own glyph, not merely some glyph', () => {
    const { contentBefore, dismiss } = renderSearchBox();
    const reference = (glyph: React.ReactElement) => render(glyph).container.querySelector('svg')!.innerHTML;

    expect(contentBefore!.querySelector('svg')!.innerHTML).toBe(reference(<SearchRegular />));
    expect(dismiss!.querySelector('svg')!.innerHTML).toBe(reference(<DismissRegular />));
    expect(reference(<SearchRegular />)).not.toBe(reference(<DismissRegular />));
  });

  it('removes the content-before slot for contentBefore={null}', () => {
    const { root, children, contentBefore } = renderSearchBox({ contentBefore: null });

    expect(contentBefore).toBeNull();
    expect(children).toHaveLength(2);
    expect(root.hasAttribute('data-content-before')).toBe(false);
  });

  it('removes the dismiss button for dismiss={null} but keeps the content-after slot', () => {
    const { children, contentAfter, dismiss } = renderSearchBox({ dismiss: null });

    expect(dismiss).toBeNull();
    expect(children).toHaveLength(3);
    expect(contentAfter!.children).toHaveLength(0);
  });

  it('removes the dismiss button along with contentAfter={null}', () => {
    const { root, children, contentAfter, dismiss } = renderSearchBox({ contentAfter: null });

    expect(contentAfter).toBeNull();
    expect(dismiss).toBeNull();
    expect(children).toHaveLength(2);
    expect(root.hasAttribute('data-content-after')).toBe(false);
  });

  it('lets a consumer glyph win over the restored one, on both slots', () => {
    const before = renderSearchBox({ contentBefore: <i data-custom="" /> });

    expect(before.contentBefore!.querySelector('[data-custom]')).not.toBeNull();
    expect(before.contentBefore!.querySelector('svg')).toBeNull();

    const after = renderSearchBox({ dismiss: <i data-custom="" /> });

    expect(after.dismiss!.querySelector('[data-custom]')).not.toBeNull();
    expect(after.dismiss!.querySelector('svg')).toBeNull();
  });

  it('keeps both the resolved slot props and the glyph for a childless object, on both slots', () => {
    const before = renderSearchBox({ contentBefore: { className: 'x', id: 'before' } });

    expect(before.contentBefore).toHaveClass(inputStyles.content);
    expect(before.contentBefore).toHaveClass('x');
    expect(before.contentBefore!.id).toBe('before');
    expect(before.contentBefore!.querySelector('svg')).not.toBeNull();

    const after = renderSearchBox({ dismiss: { className: 'x', id: 'clear' } });

    expect(after.dismiss).toHaveClass(styles.dismiss);
    expect(after.dismiss).toHaveClass('x');
    expect(after.dismiss!.id).toBe('clear');
    expect(after.dismiss!.querySelector('svg')).not.toBeNull();
  });

  it('passes consumer props and children through the content-after slot', () => {
    const { contentAfter, dismiss } = renderSearchBox({
      contentAfter: { id: 'after', children: <b data-consumer="" />, 'data-extra': 'x' },
    } as React.ComponentProps<typeof SearchBox>);

    expect(contentAfter!.id).toBe('after');
    expect(contentAfter!.getAttribute('data-extra')).toBe('x');
    expect(contentAfter!.querySelector('[data-consumer]')).not.toBeNull();
    // Consumer children come first; the dismiss button stays last inside the slot.
    expect(contentAfter!.lastElementChild).toBe(dismiss);
  });

  it('keeps the glyph for children: undefined, on both slots', () => {
    const before = renderSearchBox({ contentBefore: { children: undefined } });
    const after = renderSearchBox({ dismiss: { children: undefined } });

    expect(before.contentBefore!.querySelector('svg')).not.toBeNull();
    expect(after.dismiss!.querySelector('svg')).not.toBeNull();
  });

  it('keeps the glyph for children: null, on both slots', () => {
    const before = renderSearchBox({ contentBefore: { children: null } });
    const after = renderSearchBox({ dismiss: { children: null } });

    expect(before.contentBefore!.querySelector('svg')).not.toBeNull();
    expect(after.dismiss!.querySelector('svg')).not.toBeNull();
  });

  it('keeps the accessibility defaults of the dismiss slot through the restoration', () => {
    const { dismiss } = renderSearchBox();

    expect(dismiss!.getAttribute('role')).toBe('button');
    expect(dismiss!.getAttribute('aria-label')).toBe('clear');
    expect(dismiss!.getAttribute('tabindex')).toBe('-1');
  });

  it('clears the value from the dismiss button', () => {
    const onChange = jest.fn();
    const { input, dismiss } = renderSearchBox({ defaultValue: 'abc', onChange });

    expect(input.value).toBe('abc');

    fireEvent.click(dismiss!);

    expect(input.value).toBe('');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: '' });
  });

  it('still calls a consumer dismiss onClick', () => {
    const onClick = jest.fn();
    const { input, dismiss } = renderSearchBox({ defaultValue: 'abc', dismiss: { onClick } });

    fireEvent.click(dismiss!);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('');
  });

  it('applies its own look props rather than the ones the headless state already carries', () => {
    const { root } = renderSearchBox({ appearance: 'underline', size: 'large' });

    expect(root).toHaveClass(inputStyles.underline);
    expect(root.getAttribute('data-size')).toBe('large');
  });

  it('maps every appearance onto its own class set at every size', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [inputStyles.outlineInteractive],
      underline: [inputStyles.underline, inputStyles.underlineInteractive],
      'filled-darker': [inputStyles.filledDarker, inputStyles.filled, inputStyles.filledInteractive],
      'filled-lighter': [inputStyles.filledLighter, inputStyles.filled, inputStyles.filledInteractive],
    };

    const all = [
      inputStyles.underline,
      inputStyles.underlineInteractive,
      inputStyles.filledDarker,
      inputStyles.filledLighter,
      inputStyles.filled,
      inputStyles.filledInteractive,
      inputStyles.outlineInteractive,
    ];

    appearances.forEach(appearance => {
      sizes.forEach(size => {
        const { root } = renderSearchBox({ appearance, size });

        expect(root.getAttribute('data-size')).toBe(size);
        expected[appearance].forEach(className => expect(root).toHaveClass(className));
        all
          .filter(className => !expected[appearance].includes(className))
          .forEach(className => expect(root).not.toHaveClass(className));
      });
    });
  });

  it('defaults to the outline appearance at the medium size', () => {
    const { root } = renderSearchBox();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).toHaveClass(inputStyles.outlineInteractive);
    expect(root).not.toHaveClass(inputStyles.underline);
    expect(root).not.toHaveClass(inputStyles.filled);
  });

  it('drops every interactive and invalid class when disabled', () => {
    appearances.forEach(appearance => {
      const { root } = renderSearchBox({ appearance, disabled: true, 'aria-invalid': true });

      expect(root).toHaveClass(inputStyles.disabled);
      expect(root).not.toHaveClass(inputStyles.outlineInteractive);
      expect(root).not.toHaveClass(inputStyles.underlineInteractive);
      expect(root).not.toHaveClass(inputStyles.filledInteractive);
      expect(root).not.toHaveClass(inputStyles.invalid);
      expect(root.getAttribute('data-disabled')).toBe('');
    });
  });

  it('gates the invalid look on aria-invalid resolving to true, and never on a headless attribute', () => {
    const cases: Array<[React.ComponentProps<typeof SearchBox>, boolean]> = [
      [{ 'aria-invalid': true }, true],
      [{ 'aria-invalid': 'true' }, true],
      [{ 'aria-invalid': 'grammar' }, false],
      [{ 'aria-invalid': false }, false],
      [{}, false],
    ];

    cases.forEach(([props, invalid]) => {
      const { root } = renderSearchBox(props);

      expect(root.classList.contains(inputStyles.invalid)).toBe(invalid);
      // The headless SearchBox stamps no data-invalid at all, unlike the headless Input.
      expect(root.hasAttribute('data-invalid')).toBe(false);
    });
  });

  it('stamps data-focused only while the box holds focus', () => {
    const { root, input } = renderSearchBox();

    expect(root.hasAttribute('data-focused')).toBe(false);

    act(() => {
      fireEvent.focusIn(input);
    });

    expect(root.getAttribute('data-focused')).toBe('');

    act(() => {
      fireEvent.focusOut(input);
    });

    expect(root.hasAttribute('data-focused')).toBe(false);
  });

  it('stamps no attribute of its own on the root', () => {
    const { root } = renderSearchBox();
    const attributes = Array.from(root.attributes)
      .map(attribute => attribute.name)
      .sort();

    expect(attributes).toEqual(['class', 'data-content-after', 'data-content-before', 'data-size']);
  });

  it('stamps a content attribute per default-rendered content slot', () => {
    const both = renderSearchBox().root;

    expect(both.getAttribute('data-content-before')).toBe('true');
    expect(both.getAttribute('data-content-after')).toBe('true');

    const noBefore = renderSearchBox({ contentBefore: null }).root;

    expect(noBefore.hasAttribute('data-content-before')).toBe(false);
    expect(noBefore.getAttribute('data-content-after')).toBe('true');

    const noAfter = renderSearchBox({ contentAfter: null }).root;

    expect(noAfter.getAttribute('data-content-before')).toBe('true');
    expect(noAfter.hasAttribute('data-content-after')).toBe(false);
  });

  it('stamps data-size on the root alone', () => {
    sizes.forEach(size => {
      const { root, input, contentBefore, contentAfter, dismiss } = renderSearchBox({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      [input, contentBefore, contentAfter, dismiss].forEach(element =>
        expect(element!.hasAttribute('data-size')).toBe(false),
      );
    });
  });

  it('renders the content slots around the input, with the dismiss button inside contentAfter', () => {
    const { children, input, contentBefore, contentAfter, dismiss } = renderSearchBox();

    expect(children).toHaveLength(3);
    expect(children[0]).toBe(contentBefore);
    expect(children[1]).toBe(input);
    expect(children[2]).toBe(contentAfter);
    expect(contentAfter!.lastElementChild).toBe(dismiss);
  });

  it('splits native props onto the input and root props onto the root', () => {
    const { root, input } = renderSearchBox({
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
      name: 'q',
      placeholder: 'ph',
      required: true,
    } as React.ComponentProps<typeof SearchBox>);

    expect(input.id).toBe('my-id');
    expect(input.name).toBe('q');
    expect(input.placeholder).toBe('ph');
    expect(input.required).toBe(true);
    expect(input.getAttribute('data-testid')).toBe('t');
    expect(root.hasAttribute('data-testid')).toBe(false);
    expect(root).toHaveClass('consumer');
    expect(input).not.toHaveClass('consumer');
  });

  it('defaults the input type to search and lets a consumer override it', () => {
    expect(renderSearchBox().input.type).toBe('search');
    expect(renderSearchBox({ type: 'text' } as React.ComponentProps<typeof SearchBox>).input.type).toBe('text');
  });

  it('passes the uncontrolled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { input } = renderSearchBox({ defaultValue: 'a', onChange });

    expect(input.value).toBe('a');

    fireEvent.change(input, { target: { value: 'ab' } });

    expect(input.value).toBe('ab');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'ab' });
  });

  it('passes the controlled value machinery through untouched', () => {
    const onChange = jest.fn();
    const { input } = renderSearchBox({ value: 'a', onChange });

    expect(input.value).toBe('a');

    fireEvent.change(input, { target: { value: 'ab' } });

    expect(input.value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'ab' });
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root, input } = renderSearchBox({ className: 'consumer' });

    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(input).not.toHaveClass('consumer');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'underline',
      components: { root: 'span', input: 'input', contentBefore: 'span', contentAfter: 'span', dismiss: 'span' },
      contentAfter: { className: 'after' },
      contentBefore: { className: 'before' },
      dismiss: { className: 'clear' },
      input: { 'aria-invalid': true, className: 'native', disabled: false },
      root: { className: 'consumer' },
      size: 'large',
    } as unknown as SearchBoxState;

    const styled = useSearchBoxStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.contentAfter).not.toBe(state.contentAfter);
    expect(styled.dismiss).not.toBe(state.dismiss);

    expect(state.root.className).toBe('consumer');
    expect(state.input.className).toBe('native');
    expect(state.contentBefore!.className).toBe('before');
    expect(state.contentAfter!.className).toBe('after');
    expect(state.dismiss!.className).toBe('clear');
    expect('data-size' in state.root).toBe(false);
    expect('data-content-before' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.input.className).toContain('native');
    expect(styled.contentBefore!.className).toContain('before');
    expect(styled.contentAfter!.className).toContain('after');
    expect(styled.dismiss!.className).toContain('clear');
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => render(<SearchBox />)).not.toThrow();
    expect(() => render(<SearchBox contentBefore={<i />} dismiss={<i />} />)).not.toThrow();
    expect(() => render(<SearchBox contentBefore={null} dismiss={null} />)).not.toThrow();
    expect(() => render(<SearchBox contentAfter={null} />)).not.toThrow();
  });
});
