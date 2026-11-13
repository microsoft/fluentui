import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { InteractionTag } from '../InteractionTag/InteractionTag';
import { InteractionTagPrimary } from '../InteractionTagPrimary/InteractionTagPrimary';
import { TagGroup } from '../TagGroup/TagGroup';
import type { InteractionTagSize } from '../InteractionTag/InteractionTag.types';
import { InteractionTagSecondary } from './InteractionTagSecondary';
import {
  interactionTagSecondaryClassNames,
  useInteractionTagSecondaryStyles,
} from './useInteractionTagSecondaryStyles';

import styles from './InteractionTagSecondary.module.css';

// Frozen-state guard — see testing/freezeState.ts.
// The glyph restoration runs on this exact frozen value, so a `??=` in place of the immutable spread throws.
jest.mock('@fluentui/react-headless-components-preview/interaction-tag', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/interaction-tag');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useInteractionTagSecondary: (...args: Parameters<typeof actual.useInteractionTagSecondary>) =>
      deepFreezeState(actual.useInteractionTagSecondary(...args)),
  };
});

const sizes: InteractionTagSize[] = ['medium', 'small', 'extra-small'];

// Structural addressing: every local in this module collides with Tag's and its two siblings' under
// jest, so class presence is only asserted on the element whose own module supplied the class.
const secondaryIn = (container: HTMLElement) => container.querySelector<HTMLElement>('.fui-interaction-tag-secondary')!;

const renderSecondary = (
  secondaryProps: React.ComponentProps<typeof InteractionTagSecondary> = {},
  tagProps: React.ComponentProps<typeof InteractionTag> = {},
) => {
  const { container, ...rest } = render(
    <InteractionTag {...tagProps}>
      <InteractionTagPrimary hasSecondaryAction>Primary</InteractionTagPrimary>
      <InteractionTagSecondary aria-label="dismiss" {...secondaryProps} />
    </InteractionTag>,
  );

  return { ...rest, container, secondary: secondaryIn(container) };
};

describe('InteractionTagSecondary', () => {
  isConformant({
    Component: InteractionTagSecondary,
    displayName: 'InteractionTagSecondary',
  });

  it('stamps its own marker pair, and borrows none of Tag’s', () => {
    const { secondary } = renderSecondary();

    expect(secondary.classList[0]).toBe('fui-interaction-tag-secondary');
    expect(secondary).toHaveClass('group/fui-interaction-tag-secondary');
    expect(interactionTagSecondaryClassNames.root).toBe(
      'fui-interaction-tag-secondary group/fui-interaction-tag-secondary',
    );
    // Unlike the primary, the secondary reuses no Tag class and must not carry Tag's marker.
    expect(secondary).not.toHaveClass('fui-tag');
    expect(secondary).not.toHaveClass('group/fui-tag');
  });

  it('stamps data-size from the tag for every size', () => {
    sizes.forEach(size => {
      expect(renderSecondary({}, { size }).secondary.getAttribute('data-size')).toBe(size);
    });
  });

  describe('the dismiss glyph', () => {
    const glyphOf = (container: HTMLElement) => secondaryIn(container).querySelector('svg');
    const custom = <i data-testid="custom" />;

    it('restores a default on absent, undefined, null and a bare root slot', () => {
      expect(glyphOf(renderSecondary().container)).not.toBeNull();
      expect(glyphOf(renderSecondary({ children: undefined }).container)).not.toBeNull();
      expect(glyphOf(renderSecondary({ children: null }).container)).not.toBeNull();
      // `root` is not part of the typed props surface — ComponentProps inlines the root slot's
      // own props — but a consumer can still reach it through a spread, and both libraries drop
      // it: the shorthand goes through getIntrinsicElementProps and never becomes root.children.
      expect(glyphOf(renderSecondary({ root: {} } as never).container)).not.toBeNull();
      expect(glyphOf(renderSecondary({ root: { children: custom } } as never).container)).not.toBeNull();
    });

    it('lets consumer children win', () => {
      const element = renderSecondary({ children: custom });

      expect(element.container.querySelector('[data-testid="custom"]')).not.toBeNull();
      expect(glyphOf(element.container)).toBeNull();

      const text = renderSecondary({ children: 'x' });

      expect(secondaryIn(text.container).textContent).toBe('x');
      expect(glyphOf(text.container)).toBeNull();
    });

    it('renders nothing for an empty children array', () => {
      const { container } = renderSecondary({ children: [] });

      expect(glyphOf(container)).toBeNull();
      expect(secondaryIn(container).textContent).toBe('');
    });
  });

  it('falls back to the tag’s own defaults when it has no tag above it', () => {
    // The look arrives only through context, so the standalone fallbacks have to be the same
    // filled/rounded/medium the tag defaults to — otherwise a bare secondary renders a different
    // appearance and shape than the identical one inside a tag.
    const solo = render(<InteractionTagSecondary aria-label="dismiss" />);

    expect(secondaryIn(solo.container).className).toBe(renderSecondary().secondary.className);
    expect(secondaryIn(solo.container).getAttribute('data-size')).toBe('medium');
  });

  it('pairs itself with the primary through aria-labelledby', () => {
    const { container, secondary } = renderSecondary();
    const primary = container.querySelector<HTMLElement>('.fui-interaction-tag-primary')!;

    expect(secondary.getAttribute('aria-labelledby')).toBe(`${primary.id} ${secondary.id}`);
  });

  it('dismisses on click and on Delete/Backspace, reporting its own tag’s value', () => {
    const onDismiss = jest.fn();
    const renderGroup = () =>
      render(
        <TagGroup dismissible onDismiss={onDismiss}>
          <InteractionTag value="1">
            <InteractionTagPrimary hasSecondaryAction>One</InteractionTagPrimary>
            <InteractionTagSecondary data-testid="a" aria-label="dismiss one" />
          </InteractionTag>
          <InteractionTag value="2">
            <InteractionTagPrimary hasSecondaryAction>Two</InteractionTagPrimary>
            <InteractionTagSecondary data-testid="b" aria-label="dismiss two" />
          </InteractionTag>
        </TagGroup>,
      );
    const { container } = renderGroup();
    const byId = (id: string) => container.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;

    fireEvent.click(byId('a'));
    expect(onDismiss).toHaveBeenLastCalledWith(expect.anything(), { value: '1' });

    fireEvent.click(byId('b'));
    expect(onDismiss).toHaveBeenLastCalledWith(expect.anything(), { value: '2' });

    fireEvent.keyDown(byId('a'), { key: 'Delete' });
    expect(onDismiss).toHaveBeenLastCalledWith(expect.anything(), { value: '1' });

    fireEvent.keyDown(byId('b'), { key: 'Backspace' });
    expect(onDismiss).toHaveBeenLastCalledWith(expect.anything(), { value: '2' });
    expect(onDismiss).toHaveBeenCalledTimes(4);
  });

  it('lets a consumer onClick suppress the dismiss with preventDefault', () => {
    const onDismiss = jest.fn();
    const { container } = render(
      <TagGroup dismissible onDismiss={onDismiss}>
        <InteractionTag value="1">
          <InteractionTagPrimary hasSecondaryAction>One</InteractionTagPrimary>
          <InteractionTagSecondary data-testid="a" aria-label="dismiss" onClick={event => event.preventDefault()} />
        </InteractionTag>
      </TagGroup>,
    );

    fireEvent.click(container.querySelector<HTMLElement>('[data-testid="a"]')!);
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('selects the shape, appearance and selected classes from the tag', () => {
    expect(renderSecondary({}, { shape: 'circular' }).secondary).toHaveClass(styles.circular);
    expect(renderSecondary().secondary).not.toHaveClass(styles.circular);
    expect(renderSecondary({}, { appearance: 'outline' }).secondary).toHaveClass(styles.outline);
    expect(renderSecondary({}, { appearance: 'brand' }).secondary).toHaveClass(styles.brand);
    expect(renderSecondary({}, { selected: true }).secondary).toHaveClass(styles.selected);
    expect(renderSecondary({}, { selected: true, disabled: true }).secondary).not.toHaveClass(styles.selected);
  });

  it('carries the root module class exactly once, alongside a consumer className', () => {
    const { secondary } = renderSecondary({ className: 'consumer' });
    const classes = secondary.getAttribute('class')!.split(/\s+/);

    expect(classes.filter(c => c === styles.root)).toHaveLength(1);
    expect(classes.filter(c => c === 'consumer')).toHaveLength(1);
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const state = Object.freeze({
      root,
      components: {},
      appearance: 'filled',
      shape: 'rounded',
      size: 'small',
    }) as never;

    const next = useInteractionTagSecondaryStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-size']).toBeUndefined();
  });
});
