import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Avatar } from '../Avatar/Avatar';
import type { AvatarSize } from '../Avatar/Avatar.types';
import { InteractionTag } from '../InteractionTag/InteractionTag';
import { InteractionTagSecondary } from '../InteractionTagSecondary/InteractionTagSecondary';
import { TagGroup } from '../TagGroup/TagGroup';
import type { InteractionTagSize } from '../InteractionTag/InteractionTag.types';
import { InteractionTagPrimary } from './InteractionTagPrimary';
import { interactionTagPrimaryClassNames } from './useInteractionTagPrimaryStyles';

import styles from './InteractionTagPrimary.module.css';
import tagStyles from '../Tag/Tag.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts. The same mock
// records the avatar context each render publishes: the headless state omits avatarSize and
// avatarShape, so only the derived state can carry them.
jest.mock('@fluentui/react-headless-components-preview/interaction-tag', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/interaction-tag');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useInteractionTagPrimary: (...args: Parameters<typeof actual.useInteractionTagPrimary>) =>
      deepFreezeState(actual.useInteractionTagPrimary(...args)),
    useInteractionTagPrimaryContextValues: (
      ...args: Parameters<typeof actual.useInteractionTagPrimaryContextValues>
    ) => {
      const published = actual.useInteractionTagPrimaryContextValues(...args);

      avatarContexts.push(published as PublishedAvatarContext);

      return published;
    },
  };
});

// The avatar context value each render publishes to its `media` slot.
type PublishedAvatarContext = { avatar: Record<string, unknown> };
const avatarContexts: PublishedAvatarContext[] = [];

beforeEach(() => {
  avatarContexts.length = 0;
});

const sizes: InteractionTagSize[] = ['medium', 'small', 'extra-small'];

// Structural addressing throughout: `fuicm-root`, `fuicm-circular`, `fuicm-outline`, `fuicm-brand`,
// `fuicm-selected` and `fuicm-without-media` all collide with Tag's under jest, and the primary
// wears Tag's slot classes by design — so class ABSENCE is never asserted against a colliding
// local, and class presence is compared by identity against the map that supplied it.
const primaryIn = (container: HTMLElement) => container.querySelector<HTMLElement>('.fui-interaction-tag-primary')!;

const renderPrimary = (
  primaryProps: React.ComponentProps<typeof InteractionTagPrimary> = {},
  tagProps: React.ComponentProps<typeof InteractionTag> = {},
) => {
  const { container, ...rest } = render(
    <InteractionTag {...tagProps}>
      <InteractionTagPrimary {...primaryProps} />
    </InteractionTag>,
  );

  return { ...rest, container, primary: primaryIn(container) };
};

describe('InteractionTagPrimary', () => {
  isConformant({
    Component: InteractionTagPrimary,
    displayName: 'InteractionTagPrimary',
  });

  it('stamps its own marker pair and Tag’s beside it', () => {
    const { primary } = renderPrimary();

    expect(primary.classList[0]).toBe('fui-interaction-tag-primary');
    expect(primary).toHaveClass('group/fui-interaction-tag-primary');
    expect(interactionTagPrimaryClassNames.root).toBe('fui-interaction-tag-primary group/fui-interaction-tag-primary');
    // Load-bearing: Tag's three group-variant slot classes are reached through this pair.
    expect(primary).toHaveClass('fui-tag');
    expect(primary).toHaveClass('group/fui-tag');
  });

  it('carries its own root module class, exactly once', () => {
    // Safe despite the `fuicm-root` collision: this reads the PRIMARY element, and nothing else on
    // it supplies that ident — Tag contributes only its marker pair here, never its `.root`.
    const { primary } = renderPrimary();

    expect(
      primary
        .getAttribute('class')!
        .split(/\s+/)
        .filter(c => c === styles.root),
    ).toHaveLength(1);
  });

  it('stamps data-size from the tag for every size', () => {
    sizes.forEach(size => {
      expect(renderPrimary({}, { size }).primary.getAttribute('data-size')).toBe(size);
    });
  });

  it('dresses the four content slots in Tag’s classes', () => {
    // Props-object shorthand, not element shorthand: an element becomes the slot's CHILD, so a
    // marker on it would address the wrong node.
    const { container } = render(
      <InteractionTag>
        <InteractionTagPrimary
          media={{ id: 'media' }}
          icon={{ id: 'icon' }}
          primaryText={{ id: 'primary' }}
          secondaryText={{ id: 'secondary', children: 'Secondary' }}
        >
          Primary
        </InteractionTagPrimary>
      </InteractionTag>,
    );
    const byId = (id: string) => container.querySelector<HTMLElement>(`#${id}`)!;

    expect(byId('media')).toHaveClass(tagStyles.media);
    expect(byId('icon')).toHaveClass(tagStyles.icon);
    expect(byId('primary')).toHaveClass(tagStyles.primaryText);
    expect(byId('secondary')).toHaveClass(tagStyles.secondaryText);
  });

  it('swaps the primaryText class on the presence of secondaryText', () => {
    const { container: withSecondary } = render(
      <InteractionTag>
        <InteractionTagPrimary secondaryText="Secondary">Primary</InteractionTagPrimary>
      </InteractionTag>,
    );
    const { container: withoutSecondary } = render(
      <InteractionTag>
        <InteractionTagPrimary>Primary</InteractionTagPrimary>
      </InteractionTag>,
    );

    expect(withSecondary.querySelector(`.${tagStyles.withSecondaryText}`)).not.toBeNull();
    expect(withSecondary.querySelector(`.${tagStyles.withoutSecondaryText}`)).toBeNull();
    expect(withoutSecondary.querySelector(`.${tagStyles.withoutSecondaryText}`)).not.toBeNull();
    expect(withoutSecondary.querySelector(`.${tagStyles.withSecondaryText}`)).toBeNull();
  });

  it('keys withoutMedia off BOTH content slots', () => {
    expect(renderPrimary().primary).toHaveClass(styles.withoutMedia);
    expect(renderPrimary({ media: <span /> }).primary).not.toHaveClass(styles.withoutMedia);
    expect(renderPrimary({ icon: <span /> }).primary).not.toHaveClass(styles.withoutMedia);
  });

  it('gates the selected look on !disabled', () => {
    expect(renderPrimary({}, { selected: true }).primary).toHaveClass(styles.selected);
    // The only crossing that can catch an ungated `selected`.
    expect(renderPrimary({}, { selected: true, disabled: true }).primary).not.toHaveClass(styles.selected);
  });

  it('selects the hasSecondaryAction class, and leaves its stamp to the headless hook', () => {
    const withAction = renderPrimary({ hasSecondaryAction: true }).primary;

    expect(withAction).toHaveClass(styles.withSecondaryAction);
    expect(withAction.getAttribute('data-has-secondary-action')).toBe('');
    expect(renderPrimary().primary).not.toHaveClass(styles.withSecondaryAction);
    expect(renderPrimary().primary.getAttribute('data-has-secondary-action')).toBeNull();
  });

  it('needs both conditions for circularWithoutSecondaryAction', () => {
    expect(renderPrimary({}, { shape: 'circular' }).primary).toHaveClass(styles.circularWithoutSecondaryAction);
    expect(renderPrimary({ hasSecondaryAction: true }, { shape: 'circular' }).primary).not.toHaveClass(
      styles.circularWithoutSecondaryAction,
    );
    expect(renderPrimary().primary).not.toHaveClass(styles.circularWithoutSecondaryAction);
  });

  it('selects the appearance class from the tag', () => {
    expect(renderPrimary({}, { appearance: 'outline' }).primary).toHaveClass(styles.outline);
    expect(renderPrimary({}, { appearance: 'brand' }).primary).toHaveClass(styles.brand);
    expect(renderPrimary({}, { appearance: 'filled' }).primary).not.toHaveClass(styles.outline);
  });

  it('publishes the derived avatar look the headless state omits', () => {
    // Size comes from the tag's size, shape from the tag's shape — the two are independent axes.
    const expected = [
      { look: { size: 'medium' as const, shape: 'rounded' as const }, avatar: { size: 28, shape: 'square' } },
      { look: { size: 'small' as const, shape: 'rounded' as const }, avatar: { size: 20, shape: 'square' } },
      { look: { size: 'extra-small' as const, shape: 'circular' as const }, avatar: { size: 16, shape: 'circular' } },
      { look: { size: 'medium' as const, shape: 'circular' as const }, avatar: { size: 28, shape: 'circular' } },
      { look: { size: 'extra-small' as const, shape: 'rounded' as const }, avatar: { size: 16, shape: 'square' } },
    ];

    expected.forEach(({ look, avatar }) => {
      avatarContexts.length = 0;
      renderPrimary({ media: <span /> }, look);

      expect(avatarContexts[0].avatar).toMatchObject(avatar);
    });
  });

  it('carries the derived look into a nested Avatar', () => {
    const avatarSizes: Record<InteractionTagSize, AvatarSize> = { medium: 28, small: 20, 'extra-small': 16 };

    sizes.forEach(size => {
      const { container } = render(
        <InteractionTag size={size}>
          <InteractionTagPrimary media={<Avatar name="Ada Lovelace" />}>Primary</InteractionTagPrimary>
        </InteractionTag>,
      );
      // The control sets on the Avatar itself what the context would otherwise supply — both
      // axes, since a `rounded` tag maps to a SQUARE avatar and the Avatar's own default is
      // circular.
      const { container: control } = render(<Avatar name="Ada Lovelace" size={avatarSizes[size]} shape="square" />);

      expect(container.querySelector('[role="img"]')!.getAttribute('data-size')).toBe(String(avatarSizes[size]));
      expect(container.querySelector('[role="img"]')!.className).toBe(control.querySelector('[role="img"]')!.className);
    });
  });

  it('takes no look props of its own', () => {
    // The pin has to sit on the offending line itself, and prettier will wrap a multi-line JSX
    // tree away from it — so the rejected prop is built as a value here rather than inline.
    // @ts-expect-error -- the look lives on the InteractionTag; the primary reads it from context.
    const lookProp: React.ComponentProps<typeof InteractionTagPrimary> = { size: 'small' };
    const withProp = render(
      <InteractionTag>
        <InteractionTagPrimary {...lookProp} />
      </InteractionTag>,
    );
    const plain = render(
      <InteractionTag>
        <InteractionTagPrimary />
      </InteractionTag>,
    );

    expect(primaryIn(withProp.container).getAttribute('data-size')).toBe('medium');
    expect(primaryIn(withProp.container).className).toBe(primaryIn(plain.container).className);
  });

  it('falls back to the tag’s own defaults when it has no tag above it', () => {
    // The look arrives only through context, so the standalone fallbacks have to be the same
    // filled/rounded/medium the tag defaults to — otherwise a bare primary renders a different
    // shape and a different avatar than the identical one inside a tag.
    const solo = render(<InteractionTagPrimary media={<span />} />);

    expect(primaryIn(solo.container).className).toBe(renderPrimary({ media: <span /> }).primary.className);
    expect(primaryIn(solo.container).getAttribute('data-size')).toBe('medium');
    expect(avatarContexts[0].avatar).toMatchObject({ size: 28, shape: 'square' });
  });

  it('fires the group’s selection handler with its own tag’s value', () => {
    const onTagSelect = jest.fn();
    const { container } = render(
      <TagGroup role="listbox" selectedValues={['1']} onTagSelect={onTagSelect}>
        <InteractionTag value="1">
          <InteractionTagPrimary data-testid="a">One</InteractionTagPrimary>
        </InteractionTag>
        <InteractionTag value="2">
          <InteractionTagPrimary data-testid="b">Two</InteractionTagPrimary>
        </InteractionTag>
      </TagGroup>,
    );
    const byId = (id: string) => container.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;

    expect(byId('a').getAttribute('aria-pressed')).toBe('true');
    expect(byId('b').getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(byId('b'));
    expect(onTagSelect).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'click', value: '2' }),
    );

    fireEvent.click(byId('a'));
    expect(onTagSelect).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ type: 'click', value: '1' }),
    );
    expect(onTagSelect).toHaveBeenCalledTimes(2);
  });

  it('hands a consumer onClick straight to the DOM, selection handler and all', () => {
    // The base hook builds a merged onClick and then spreads `...props` after it, so a consumer
    // handler REPLACES the selection call rather than composing with it. Both libraries behave
    // this way; windmod passes props through untouched and must keep doing so.
    const onTagSelect = jest.fn();
    const onClick = jest.fn();
    const { container } = render(
      <TagGroup onTagSelect={onTagSelect}>
        <InteractionTag value="1">
          <InteractionTagPrimary data-testid="a" onClick={onClick}>
            One
          </InteractionTagPrimary>
        </InteractionTag>
      </TagGroup>,
    );

    fireEvent.click(container.querySelector<HTMLElement>('[data-testid="a"]')!);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onTagSelect).not.toHaveBeenCalled();
  });

  it('keeps a consumer className exactly once', () => {
    const { primary } = renderPrimary({ className: 'consumer' });

    expect(
      primary
        .getAttribute('class')!
        .split(/\s+/)
        .filter(c => c === 'consumer'),
    ).toHaveLength(1);
  });

  it('renders inside a full composite without touching the secondary', () => {
    const { container } = render(
      <InteractionTag>
        <InteractionTagPrimary hasSecondaryAction>Primary</InteractionTagPrimary>
        <InteractionTagSecondary aria-label="dismiss" />
      </InteractionTag>,
    );
    const secondary = container.querySelector<HTMLElement>('.fui-interaction-tag-secondary')!;

    expect(secondary).not.toHaveClass('fui-tag');
  });
});
