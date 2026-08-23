import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { isConformant } from '../../testing/isConformant';
import { Tag } from './Tag';
import type { TagAppearance, TagShape, TagSize } from './Tag.types';
import { tagClassNames, useTagStyles } from './useTagStyles';

import styles from './Tag.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/tag', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tag');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTag: (...args: Parameters<typeof actual.useTag>) => deepFreezeState(actual.useTag(...args)),
  };
});

const appearances: TagAppearance[] = ['filled', 'outline', 'brand'];
const shapes: TagShape[] = ['rounded', 'circular'];
const sizes: TagSize[] = ['medium', 'small', 'extra-small'];

const renderTag = (props: React.ComponentProps<typeof Tag> = {}) => {
  const { container } = render(<Tag {...props}>Primary</Tag>);
  const root = container.firstElementChild as HTMLElement;

  return {
    root,
    // The dismiss element is always last; media/icon are always first, in that order.
    dismiss: root.lastElementChild as HTMLElement,
    dismissSvg: root.lastElementChild?.querySelector('svg') ?? null,
  };
};

const dismissPath = () => {
  const { container } = render(<DismissRegular />);

  return container.querySelector('path')!.getAttribute('d');
};

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderTag();

    expect(root).toHaveClass('fui-tag');
    expect(root).toHaveClass('group/fui-tag');
    expect(root.classList[0]).toBe('fui-tag');
    expect(tagClassNames.root).toBe('fui-tag group/fui-tag');
  });

  it('stamps the size on the root and defaults it to medium', () => {
    expect(renderTag().root.getAttribute('data-size')).toBe('medium');

    sizes.forEach(size => {
      expect(renderTag({ size }).root.getAttribute('data-size')).toBe(size);
    });
  });

  it('carries the root module class and keeps the consumer className', () => {
    const { root } = renderTag({ className: 'consumer' });

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
  });

  it('applies no look class for the base looks', () => {
    const { root } = renderTag();

    // `filled` and `rounded` have no module class at all: their declarations live in `.root`.
    // The jest proxy answers every key, so a missing guard shows up here rather than as undefined.
    expect(root).not.toHaveClass(styles.filled);
    expect(root).not.toHaveClass(styles.rounded);
    expect(root).not.toHaveClass(styles.circular);
    expect(root).not.toHaveClass(styles.outline);
    expect(root).not.toHaveClass(styles.brand);
    expect(root).not.toHaveClass(styles.selected);
    expect(root.className).not.toContain('undefined');
  });

  it('applies the circular class only for shape="circular"', () => {
    expect(renderTag({ shape: 'circular' }).root).toHaveClass(styles.circular);
    expect(renderTag({ shape: 'rounded' }).root).not.toHaveClass(styles.circular);
  });

  it('applies an appearance class for every appearance except filled', () => {
    expect(renderTag({ appearance: 'outline' }).root).toHaveClass(styles.outline);
    expect(renderTag({ appearance: 'brand' }).root).toHaveClass(styles.brand);

    const filled = renderTag({ appearance: 'filled' }).root;

    expect(filled).not.toHaveClass(styles.filled);
    expect(filled).not.toHaveClass(styles.outline);
    expect(filled).not.toHaveClass(styles.brand);
    expect(filled.className).not.toContain('undefined');
  });

  it('suppresses the selected look while disabled', () => {
    expect(renderTag({ selected: true }).root).toHaveClass(styles.selected);
    expect(renderTag({ selected: true, disabled: true }).root).not.toHaveClass(styles.selected);
  });

  it('drops the leading padding class when either content slot exists', () => {
    const box = <i />;

    expect(renderTag().root).toHaveClass(styles.withoutMedia);
    expect(renderTag({ media: box }).root).not.toHaveClass(styles.withoutMedia);
    expect(renderTag({ icon: box }).root).not.toHaveClass(styles.withoutMedia);
    expect(renderTag({ media: box, icon: box }).root).not.toHaveClass(styles.withoutMedia);
  });

  it('gates the trailing padding class on the dismissIcon SLOT, not on dismissible', () => {
    expect(renderTag().root).toHaveClass(styles.withoutDismiss);
    expect(renderTag({ dismissible: true }).root).not.toHaveClass(styles.withoutDismiss);
    // Upstream behaviour, reproduced deliberately: a dismissIcon shorthand resolves the slot even
    // without `dismissible`, so the trailing padding goes even though nothing renders there.
    expect(renderTag({ dismissIcon: <i /> }).root).not.toHaveClass(styles.withoutDismiss);
  });

  it('restores the default dismiss glyph without discarding consumer children', () => {
    const path = dismissPath();
    const consumer = <i data-testid="consumer" />;

    // Every shape that leaves children unset gets the default glyph.
    expect(renderTag({ dismissible: true }).dismissSvg?.querySelector('path')?.getAttribute('d')).toBe(path);
    expect(
      renderTag({ dismissible: true, dismissIcon: { className: 'x' } })
        .dismissSvg?.querySelector('path')
        ?.getAttribute('d'),
    ).toBe(path);
    expect(
      renderTag({ dismissible: true, dismissIcon: { children: null } })
        .dismissSvg?.querySelector('path')
        ?.getAttribute('d'),
    ).toBe(path);
    expect(
      renderTag({ dismissible: true, dismissIcon: { children: undefined } })
        .dismissSvg?.querySelector('path')
        ?.getAttribute('d'),
    ).toBe(path);
    expect(renderTag({ dismissible: true, dismissIcon: 'text' }).dismiss.textContent).toBe('text');

    // Consumer children win, in either spelling.
    expect(
      renderTag({ dismissible: true, dismissIcon: consumer }).dismiss.querySelector('[data-testid]'),
    ).not.toBeNull();
    expect(
      renderTag({ dismissible: true, dismissIcon: { children: consumer } }).dismiss.querySelector('[data-testid]'),
    ).not.toBeNull();

    // `null` removes the slot outright.
    const removed = renderTag({ dismissible: true, dismissIcon: null });

    expect(removed.dismissSvg).toBeNull();
    expect(removed.root).toHaveClass(styles.withoutDismiss);
  });

  it('restores the glyph AFTER the headless hook, so a plain Tag keeps its trailing padding', () => {
    // Materialising the slot before useTag would resolve a dismissIcon on a non-dismissible Tag.
    // Nothing renders either way, so the class list is the only visible witness.
    const { root, dismissSvg } = renderTag();

    expect(root).toHaveClass(styles.withoutDismiss);
    expect(dismissSvg).toBeNull();
  });

  it('decorates every slot it owns', () => {
    const box = <i />;
    const { container } = render(
      <Tag media={box} icon={box} secondaryText="Secondary" dismissible>
        Primary
      </Tag>,
    );
    const root = container.firstElementChild as HTMLElement;
    const [media, icon, primary, secondary, dismiss] = Array.from(root.children);

    expect(media).toHaveClass(styles.media);
    expect(icon).toHaveClass(styles.icon);
    expect(primary).toHaveClass(styles.primaryText);
    expect(secondary).toHaveClass(styles.secondaryText);
    expect(dismiss).toHaveClass(styles.dismissIcon);
  });

  it('picks exactly one primary-text structural class', () => {
    const alone = render(<Tag>Primary</Tag>).container.firstElementChild!.firstElementChild!;

    expect(alone).toHaveClass(styles.withoutSecondaryText);
    expect(alone).not.toHaveClass(styles.withSecondaryText);

    const paired = render(<Tag secondaryText="Secondary">Primary</Tag>).container.firstElementChild!.firstElementChild!;

    expect(paired).toHaveClass(styles.withSecondaryText);
    expect(paired).not.toHaveClass(styles.withoutSecondaryText);
  });

  it('keeps consumer classNames on every slot', () => {
    const { container } = render(
      <Tag
        media={{ children: <i />, className: 'c-media' }}
        icon={{ children: <i />, className: 'c-icon' }}
        primaryText={{ children: 'Primary', className: 'c-primary' }}
        secondaryText={{ children: 'Secondary', className: 'c-secondary' }}
        dismissible
        dismissIcon={{ className: 'c-dismiss' }}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    const [media, icon, primary, secondary, dismiss] = Array.from(root.children);

    expect(media).toHaveClass('c-media');
    expect(icon).toHaveClass('c-icon');
    expect(primary).toHaveClass('c-primary');
    expect(secondary).toHaveClass('c-secondary');
    expect(dismiss).toHaveClass('c-dismiss');
  });

  it('renders a span, or a button when dismissible', () => {
    expect(renderTag().root.tagName).toBe('SPAN');
    expect(renderTag({ disabled: true }).root.tagName).toBe('SPAN');
    expect(renderTag({ disabled: true }).root.hasAttribute('disabled')).toBe(false);
    expect(renderTag({ disabled: true }).root.getAttribute('data-disabled')).toBe('');

    const button = renderTag({ dismissible: true }).root as HTMLButtonElement;

    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(renderTag({ dismissible: true, disabled: true }).root.hasAttribute('disabled')).toBe(true);
  });

  it('passes interaction handlers through to the root', () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn(event => event.preventDefault());
    const { root } = renderTag({ dismissible: true, onClick, onKeyDown });

    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);

    const event = fireEvent.keyDown(root, { key: 'Delete' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    // A dismiss keypress outside a TagGroup must not throw, and the consumer's preventDefault stands.
    expect(event).toBe(false);
  });

  it('lets a primaryText shorthand replace children', () => {
    const { container } = render(<Tag primaryText="Shorthand">Children</Tag>);

    expect(container.firstElementChild!.textContent).toBe('Shorthand');
  });

  it('passes native props and the ref through for both root element types', () => {
    ([false, true] as const).forEach(dismissible => {
      const ref = React.createRef<HTMLSpanElement & HTMLButtonElement>();
      const { container } = render(
        <Tag dismissible={dismissible} ref={ref} id="tag-id" value="v" data-testid="t" style={{ opacity: 0.5 }}>
          Primary
        </Tag>,
      );
      const root = container.firstElementChild as HTMLElement;

      expect(ref.current).toBe(root);
      expect(root.id).toBe('tag-id');
      expect(root.getAttribute('data-testid')).toBe('t');
      expect(root.style.opacity).toBe('0.5');
    });
  });

  it('returns new state without mutating what it was given', () => {
    const root = Object.freeze({ className: 'given' }) as never;
    const dismissIcon = Object.freeze({ children: 'x' }) as never;
    const state = Object.freeze({
      root,
      dismissIcon,
      components: {},
      dismissible: true,
      appearance: 'filled',
      shape: 'rounded',
      size: 'medium',
    }) as never;

    const next = useTagStyles(state);

    expect(next).not.toBe(state);
    expect(next.root).not.toBe(root);
    expect(next.dismissIcon).not.toBe(dismissIcon);
    expect((root as { className: string }).className).toBe('given');
  });

  it('feeds the headless context values to the renderer', () => {
    // renderTag reads contextValues.avatar; a missing second argument throws.
    expect(() => render(<Tag media={<i />}>Primary</Tag>)).not.toThrow();
  });

  it('covers every look-prop crossing without emitting an undefined class', () => {
    appearances.forEach(appearance =>
      shapes.forEach(shape =>
        sizes.forEach(size => {
          const { root } = renderTag({ appearance, shape, size });

          expect(root.className).not.toContain('undefined');
          expect(root.getAttribute('data-size')).toBe(size);
        }),
      ),
    );
  });
});
