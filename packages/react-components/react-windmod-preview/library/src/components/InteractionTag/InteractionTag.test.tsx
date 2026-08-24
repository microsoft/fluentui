import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { InteractionTagPrimary } from '../InteractionTagPrimary/InteractionTagPrimary';
import primaryStyles from '../InteractionTagPrimary/InteractionTagPrimary.module.css';
import { InteractionTagSecondary } from '../InteractionTagSecondary/InteractionTagSecondary';
import secondaryStyles from '../InteractionTagSecondary/InteractionTagSecondary.module.css';
import { TagGroup } from '../TagGroup/TagGroup';
import type { InteractionTagSize } from './InteractionTag.types';
import { InteractionTag } from './InteractionTag';
import { interactionTagClassNames, useInteractionTagStyles } from './useInteractionTagStyles';

import styles from './InteractionTag.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts. The same mock
// records what each render publishes to the Griffel context: the headless state omits all three
// look values, so only the styled state can carry them.
jest.mock('@fluentui/react-headless-components-preview/interaction-tag', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/interaction-tag');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useInteractionTag: (...args: Parameters<typeof actual.useInteractionTag>) =>
      deepFreezeState(actual.useInteractionTag(...args)),
    useInteractionTagContextValues: (...args: Parameters<typeof actual.useInteractionTagContextValues>) => {
      const published = actual.useInteractionTagContextValues(...args);

      contextValues.push(published as PublishedContextValues);

      return published;
    },
  };
});

// The Griffel context value each render publishes to its two children.
type PublishedContextValues = { interactionTag: Record<string, unknown> };
const contextValues: PublishedContextValues[] = [];

beforeEach(() => {
  contextValues.length = 0;
});

const sizes: InteractionTagSize[] = ['medium', 'small', 'extra-small'];

// Every module local in this family collides with Tag's under jest (generateTestIdent drops both
// the component token and the hash), and the primary additionally wears Tag's classes by design.
// So elements are addressed structurally and class presence is only ever asserted on the element
// whose own module supplied the class.
const tagRoot = (container: HTMLElement) => container.firstElementChild as HTMLElement;
const primaryOf = (root: HTMLElement) => root.children[0] as HTMLElement;
const secondaryOf = (root: HTMLElement) => root.children[1] as HTMLElement;

const renderTag = (props: React.ComponentProps<typeof InteractionTag> = {}) => {
  const { container, ...rest } = render(
    <InteractionTag {...props}>
      <InteractionTagPrimary hasSecondaryAction>Primary</InteractionTagPrimary>
      <InteractionTagSecondary aria-label="dismiss" />
    </InteractionTag>,
  );
  const root = tagRoot(container);

  return { ...rest, container, root, primary: primaryOf(root), secondary: secondaryOf(root) };
};

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderTag();

    expect(root).toHaveClass('fui-interaction-tag');
    expect(root).toHaveClass('group/fui-interaction-tag');
    expect(root.classList[0]).toBe('fui-interaction-tag');
    expect(interactionTagClassNames.root).toBe('fui-interaction-tag group/fui-interaction-tag');
  });

  it('carries the root module class', () => {
    const { root } = renderTag();

    expect(root).toHaveClass(styles.root);
    expect(root.className).not.toContain('undefined');
  });

  it('stamps data-size on all three roots for every size', () => {
    sizes.forEach(size => {
      const { root, primary, secondary } = renderTag({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      // Each button stamps its own — the tag's own stamp is on a different element.
      expect(primary.getAttribute('data-size')).toBe(size);
      expect(secondary.getAttribute('data-size')).toBe(size);
      expect(primary).not.toBe(root);
      expect(secondary).not.toBe(root);
    });
  });

  it('selects the circular class from shape', () => {
    expect(renderTag({ shape: 'circular' }).root).toHaveClass(styles.circular);
    expect(renderTag().root).not.toHaveClass(styles.circular);
  });

  it('defaults all three look props', () => {
    const { root, primary, secondary } = renderTag();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).not.toHaveClass(styles.circular);
    expect(primary).not.toHaveClass(primaryStyles.outline);
    expect(primary).not.toHaveClass(primaryStyles.brand);
    expect(secondary).not.toHaveClass(secondaryStyles.outline);
    expect(secondary).not.toHaveClass(secondaryStyles.brand);
  });

  it('carries exactly the attributes the two layers own', () => {
    expect(
      tagRoot(render(<InteractionTag />).container)
        .getAttributeNames()
        .sort(),
    ).toEqual(['class', 'data-size', 'id']);

    expect(
      tagRoot(render(<InteractionTag disabled selected />).container)
        .getAttributeNames()
        .sort(),
    ).toEqual(['class', 'data-disabled', 'data-selected', 'data-size', 'id']);
  });

  it('leaves data-disabled and data-selected to the headless hook', () => {
    const root = tagRoot(render(<InteractionTag disabled selected />).container);

    // The headless library's own presence spelling, stamped once each.
    expect(root.getAttribute('data-disabled')).toBe('');
    expect(root.getAttribute('data-selected')).toBe('');
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(c => c === styles.root),
    ).toHaveLength(1);
  });

  it('carries the look to both children', () => {
    const { primary, secondary } = renderTag({ size: 'small', appearance: 'outline', shape: 'circular' });

    expect(primary).toHaveClass(primaryStyles.outline);
    expect(primary).toHaveClass(primaryStyles.circular);
    expect(primary.getAttribute('data-size')).toBe('small');
    expect(secondary).toHaveClass(secondaryStyles.outline);
    expect(secondary).toHaveClass(secondaryStyles.circular);
    expect(secondary.getAttribute('data-size')).toBe('small');
  });

  it('fills the Griffel context values the headless state publishes empty', () => {
    render(
      <InteractionTag size="small" appearance="outline" shape="circular">
        <InteractionTagPrimary>Primary</InteractionTagPrimary>
      </InteractionTag>,
    );

    expect(contextValues[0].interactionTag).toMatchObject({
      appearance: 'outline',
      shape: 'circular',
      size: 'small',
    });

    contextValues.length = 0;
    render(<InteractionTag />);

    expect(contextValues[0].interactionTag).toMatchObject({
      appearance: 'filled',
      shape: 'rounded',
      size: 'medium',
    });
  });

  it('takes its defaults from a TagGroup, and still lets a local prop win', () => {
    const { container } = render(
      <TagGroup size="small" appearance="outline">
        <InteractionTag>
          <InteractionTagPrimary>Primary</InteractionTagPrimary>
        </InteractionTag>
      </TagGroup>,
    );
    const fromGroup = container.querySelector<HTMLElement>('.fui-interaction-tag')!;

    expect(fromGroup.getAttribute('data-size')).toBe('small');
    expect(primaryOf(fromGroup)).toHaveClass(primaryStyles.outline);

    const { container: local } = render(
      <TagGroup size="small" appearance="outline">
        <InteractionTag size="medium" appearance="brand">
          <InteractionTagPrimary>Primary</InteractionTagPrimary>
        </InteractionTag>
      </TagGroup>,
    );
    const own = local.querySelector<HTMLElement>('.fui-interaction-tag')!;

    expect(own.getAttribute('data-size')).toBe('medium');
    expect(primaryOf(own)).toHaveClass(primaryStyles.brand);
    expect(primaryOf(own)).not.toHaveClass(primaryStyles.outline);
  });

  it('keeps a consumer className exactly once', () => {
    const { root } = renderTag({ className: 'consumer' });

    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(c => c === 'consumer'),
    ).toHaveLength(1);
  });

  it('passes native props and the ref through', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(<InteractionTag ref={ref} id="tag-id" style={{ opacity: 0.5 }} />);
    const root = tagRoot(container);

    expect(ref.current).toBe(root);
    expect(root.id).toBe('tag-id');
    expect(root.style.opacity).toBe('0.5');
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

    const next = useInteractionTagStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect((root as { className: string }).className).toBe('given');
    expect((root as Record<string, unknown>)['data-size']).toBeUndefined();
  });
});
