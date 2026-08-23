import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from '@fluentui/react-headless-components-preview/provider';
import { PersonRegular } from '@fluentui/react-icons/headless/svg/person';

import { isConformant } from '../../testing/isConformant';
import { Avatar } from './Avatar';
import type { AvatarNamedColor, AvatarSize, AvatarState } from './Avatar.types';
import { avatarClassNames, useAvatarStyles } from './useAvatarStyles';

import styles from './Avatar.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/avatar', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/avatar');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAvatar: (...args: Parameters<typeof actual.useAvatar>) => deepFreezeState(actual.useAvatar(...args)),
  };
});

const sizes: AvatarSize[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

// The icon slot is the only aria-hidden span the root owns directly; the initials slot carries a
// generated id and the active label element is hidden rather than aria-hidden.
const parts = (root: HTMLElement) => ({
  root,
  initials: root.querySelector<HTMLElement>('[id$="__initials"]'),
  icon:
    Array.from(root.children).find(
      (child): child is HTMLElement => child.tagName === 'SPAN' && child.getAttribute('aria-hidden') === 'true',
    ) ?? null,
  image: root.querySelector<HTMLImageElement>('img'),
  activeLabel: root.querySelector<HTMLElement>('span[hidden]'),
});

const renderAvatar = (props: React.ComponentProps<typeof Avatar> = {}) => {
  const { container } = render(<Avatar {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

const personPath = () => {
  const { container } = render(<PersonRegular />);

  return container.querySelector('path')!.getAttribute('d');
};

const pathOf = (element: Element | null) => element?.querySelector('svg path')?.getAttribute('d') ?? null;

describe('Avatar', () => {
  isConformant({
    Component: Avatar,
    displayName: 'Avatar',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderAvatar();

    expect(root).toHaveClass('fui-avatar');
    expect(root).toHaveClass('group/fui-avatar');
    expect(root.classList[0]).toBe('fui-avatar');
    expect(avatarClassNames.root).toBe('fui-avatar group/fui-avatar');
  });

  it('stamps the numeric size on the root and defaults it to 32', () => {
    expect(renderAvatar().root.getAttribute('data-size')).toBe('32');

    sizes.forEach(size => {
      expect(renderAvatar({ size }).root.getAttribute('data-size')).toBe(String(size));
    });
  });

  it('carries the root module class and keeps the consumer className exactly once', () => {
    const { root } = renderAvatar({ className: 'consumer' });

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    const tokens = root.getAttribute('class')!.split(/\s+/);

    expect(tokens.filter(token => token === 'consumer')).toHaveLength(1);
    expect(tokens.filter(token => token === styles.root)).toHaveLength(1);
  });

  it('picks the text bucket by size, with no class in the base band', () => {
    const expected: Array<[AvatarSize, string | undefined]> = [
      [24, styles.textCaption2Strong],
      [28, styles.textCaption1Strong],
      [32, undefined],
      [40, undefined],
      [56, styles.textSubtitle2],
      [64, styles.textSubtitle1],
      [96, styles.textSubtitle1],
      [120, styles.textTitle3],
    ];
    const all = [
      styles.textCaption2Strong,
      styles.textCaption1Strong,
      styles.textSubtitle2,
      styles.textSubtitle1,
      styles.textTitle3,
    ];

    expected.forEach(([size, className]) => {
      const { root } = renderAvatar({ size });

      all.forEach(candidate => {
        if (candidate === className) {
          expect(root).toHaveClass(candidate);
        } else {
          expect(root).not.toHaveClass(candidate);
        }
      });
    });
  });

  it('picks the square radius bucket by size, and applies none when circular', () => {
    const expected: Array<[AvatarSize, string]> = [
      [24, styles.squareSmall],
      [28, styles.squareMedium],
      [48, styles.squareMedium],
      [56, styles.squareLarge],
      [72, styles.squareLarge],
      [96, styles.squareXLarge],
    ];
    const all = [styles.squareSmall, styles.squareMedium, styles.squareLarge, styles.squareXLarge];

    expected.forEach(([size, className]) => {
      const { root } = renderAvatar({ shape: 'square', size });

      expect(root).toHaveClass(className);
      all.filter(candidate => candidate !== className).forEach(candidate => expect(root).not.toHaveClass(candidate));
    });

    sizes.forEach(size => {
      const { root } = renderAvatar({ size });

      all.forEach(candidate => expect(root).not.toHaveClass(candidate));
    });
  });

  it('picks the ring width bucket by size, and rings only for ring and ring-shadow', () => {
    const expected: Array<[AvatarSize, string]> = [
      [48, styles.ringThick],
      [56, styles.ringThicker],
      [64, styles.ringThicker],
      [72, styles.ringThickest],
    ];
    const all = [styles.ringThick, styles.ringThicker, styles.ringThickest];

    expected.forEach(([size, className]) => {
      const { root } = renderAvatar({ active: 'active', size });

      expect(root).toHaveClass(styles.ring);
      expect(root).toHaveClass(className);
      all.filter(candidate => candidate !== className).forEach(candidate => expect(root).not.toHaveClass(candidate));
    });

    expect(renderAvatar({ active: 'active', activeAppearance: 'ring-shadow' }).root).toHaveClass(styles.ring);
    expect(renderAvatar({ active: 'active', activeAppearance: 'shadow' }).root).not.toHaveClass(styles.ring);
    expect(renderAvatar({ activeAppearance: 'ring' }).root).not.toHaveClass(styles.ring);
  });

  it('picks the shadow depth bucket by size, and shadows only for shadow and ring-shadow', () => {
    const expected: Array<[AvatarSize, string]> = [
      [28, styles.shadow4],
      [32, styles.shadow8],
      [48, styles.shadow8],
      [56, styles.shadow16],
      [64, styles.shadow16],
      [72, styles.shadow28],
    ];
    const all = [styles.shadow4, styles.shadow8, styles.shadow16, styles.shadow28];

    expected.forEach(([size, className]) => {
      const { root } = renderAvatar({ active: 'active', activeAppearance: 'shadow', size });

      expect(root).toHaveClass(styles.shadow);
      expect(root).toHaveClass(className);
      all.filter(candidate => candidate !== className).forEach(candidate => expect(root).not.toHaveClass(candidate));
    });

    expect(renderAvatar({ active: 'active', activeAppearance: 'ring-shadow' }).root).toHaveClass(styles.shadow);
    expect(renderAvatar({ active: 'active', activeAppearance: 'ring' }).root).not.toHaveClass(styles.shadow);
    expect(renderAvatar({ activeAppearance: 'shadow' }).root).not.toHaveClass(styles.shadow);
  });

  it('animates for both active and inactive, and fades for inactive alone', () => {
    expect(renderAvatar({ active: 'active' }).root).toHaveClass(styles.activeOrInactive);
    expect(renderAvatar({ active: 'inactive' }).root).toHaveClass(styles.activeOrInactive);
    expect(renderAvatar().root).not.toHaveClass(styles.activeOrInactive);

    expect(renderAvatar({ active: 'inactive' }).root).toHaveClass(styles.inactive);
    expect(renderAvatar({ active: 'active' }).root).not.toHaveClass(styles.inactive);
    expect(renderAvatar().root).not.toHaveClass(styles.inactive);
  });

  it('applies the colour class, defaulting to neutral', () => {
    expect(renderAvatar().root).toHaveClass(styles.neutral);

    (['brand', 'dark-red', 'seafoam', 'navy', 'anchor'] as const).forEach(color => {
      const { root } = renderAvatar({ color });

      expect(root).toHaveClass(styles[color]);
      expect(root).not.toHaveClass(styles.neutral);
    });
  });

  it('resolves colorful through the hash Griffel uses, deterministically', () => {
    // Measured against @fluentui/react-avatar's own rendered colour classes.
    const expected: Array<[string, AvatarNamedColor]> = [
      ['Katri Athokas', 'lilac'],
      ['Elvia Atkins', 'gold'],
      ['Cameron Evans', 'dark-red'],
      ['Wanda Howard', 'blue'],
      ['Mona Kane', 'light-teal'],
      ['Robert Tolbert', 'anchor'],
    ];

    expected.forEach(([name, color]) => {
      expect(renderAvatar({ color: 'colorful', name }).root).toHaveClass(styles[color]);
      expect(renderAvatar({ color: 'colorful', name }).root).toHaveClass(styles[color]);
    });

    // A name with no derivable initials still colours the icon-bearing Avatar.
    expect(renderAvatar({ color: 'colorful', name: '山田 太郎' }).root).toHaveClass(styles.navy);
    expect(renderAvatar({ color: 'colorful' }).root).toHaveClass(styles['dark-red']);
  });

  it('seeds the colorful hash from idForColor in preference to name', () => {
    expect(renderAvatar({ color: 'colorful', idForColor: 'abc' }).root).toHaveClass(styles.beige);
    expect(renderAvatar({ color: 'colorful', idForColor: 'user-42' }).root).toHaveClass(styles.mink);
    expect(renderAvatar({ color: 'colorful', idForColor: 'abc', name: 'Katri Athokas' }).root).toHaveClass(
      styles.beige,
    );
    expect(renderAvatar({ color: 'colorful', name: 'Katri Athokas' }).root).toHaveClass(styles.lilac);
  });

  it('seeds the hash from an empty idForColor rather than falling through to name', () => {
    // The fallback is nullish-coalescing, so an explicit empty string is a seed in its own right —
    // it must not be treated as absent the way undefined is.
    expect(renderAvatar({ color: 'colorful', idForColor: '', name: 'Katri Athokas' }).root).toHaveClass(
      styles['dark-red'],
    );
    expect(renderAvatar({ color: 'colorful', name: 'Katri Athokas' }).root).not.toHaveClass(styles['dark-red']);
  });

  it('restores the person glyph across every icon shorthand shape', () => {
    const person = personPath();

    expect(pathOf(renderAvatar().icon)).toBe(person);
    expect(pathOf(renderAvatar({ icon: { className: 'x' } }).icon)).toBe(person);
    expect(renderAvatar({ icon: { className: 'x' } }).icon).toHaveClass('x');

    const element = renderAvatar({ icon: <i data-consumer="" /> });

    expect(element.icon!.querySelector('[data-consumer]')).not.toBeNull();
    expect(element.icon!.querySelector('svg')).toBeNull();

    expect(renderAvatar({ icon: 'TXT' }).icon!.textContent).toBe('TXT');
    expect(
      renderAvatar({ icon: { children: <i data-consumer="" /> } }).icon!.querySelector('[data-consumer]'),
    ).not.toBeNull();

    expect(renderAvatar({ icon: null }).icon).toBeNull();
  });

  it('falls back to the glyph for icon children of null or undefined', () => {
    // The uniform glyph rule is nullish-coalescing, so both blank spellings take the default —
    // the two inputs where windmod does not reproduce the Griffel Avatar's empty <span>.
    expect(pathOf(renderAvatar({ icon: { children: null } }).icon)).toBe(personPath());
    expect(pathOf(renderAvatar({ icon: { children: undefined } }).icon)).toBe(personPath());
  });

  it('treats falsy-but-present icon children as consumer content', () => {
    ([0, '', false] as const).forEach(children => {
      expect(renderAvatar({ icon: { children } }).icon!.querySelector('svg')).toBeNull();
    });

    expect(renderAvatar({ icon: { children: 0 } }).icon!.textContent).toBe('0');
  });

  it('restores the glyph on the icon the failed-image fallback reveals', () => {
    const { root, image } = renderAvatar({ image: { src: 'broken.png' } });

    expect(parts(root).icon).toBeNull();

    fireEvent.error(image!);

    expect(pathOf(parts(root).icon)).toBe(personPath());
  });

  it('truncates derived initials to one code point at size 16 only', () => {
    expect(renderAvatar({ name: 'Katri Athokas', size: 16 }).initials!.textContent).toBe('K');
    expect(renderAvatar({ name: 'Katri Athokas', size: 20 }).initials!.textContent).toBe('KA');
    expect(renderAvatar({ name: 'Katri Athokas' }).initials!.textContent).toBe('KA');

    // A consumer's own initials content is not derived, so it is never truncated.
    expect(renderAvatar({ initials: 'ZZ', size: 16 }).initials!.textContent).toBe('ZZ');
    expect(renderAvatar({ initials: { children: 'ZZ' }, size: 16 }).initials!.textContent).toBe('ZZ');

    // A childless shorthand still leaves the derivation in place.
    const childless = renderAvatar({ initials: { className: 'x' }, name: 'Katri Athokas', size: 16 });

    expect(childless.initials!.textContent).toBe('K');
    expect(childless.initials).toHaveClass('x');
  });

  it('truncates to the true first initial under an RTL provider, not the first code point of the swapped pair', () => {
    // The headless base already swapped the pair for RTL (getInitials.ts), so taking the leading
    // code point of that swapped string would show the second initial, not the first.
    const { container } = render(
      <Provider dir="rtl">
        <Avatar name="Katri Athokas" size={16} />
      </Provider>,
    );
    const root = container.querySelector('[role="img"]') as HTMLElement;

    expect(root.querySelector('[id$="__initials"]')!.textContent).toBe('K');
  });

  it('drives the image → initials → icon cascade off the real load and error events', () => {
    const withName = renderAvatar({ image: { src: 'x.png' }, name: 'Katri Athokas' });

    expect(withName.initials!.textContent).toBe('KA');
    expect(withName.image!.hasAttribute('hidden')).toBe(false);
    expect(withName.icon).toBeNull();

    fireEvent.error(withName.image!);

    expect(parts(withName.root).image!.hasAttribute('hidden')).toBe(true);
    expect(parts(withName.root).initials!.textContent).toBe('KA');

    fireEvent.load(withName.image!);

    expect(parts(withName.root).image!.hasAttribute('hidden')).toBe(false);

    const withoutName = renderAvatar({ image: { src: 'x.png' } });

    expect(withoutName.initials).toBeNull();
    expect(withoutName.icon).toBeNull();

    fireEvent.error(withoutName.image!);

    expect(parts(withoutName.root).icon).not.toBeNull();

    fireEvent.load(withoutName.image!);

    expect(parts(withoutName.root).icon).toBeNull();
  });

  it('renders no image element when the shorthand carries no src', () => {
    expect(renderAvatar({ image: { alt: 'x' } }).image).toBeNull();
    expect(renderAvatar({ image: { src: 'x.png' } }).image).not.toBeNull();
  });

  it('decorates each slot with its own classes, and picks the icon size bucket', () => {
    const image = renderAvatar({ image: { src: 'x.png' } });

    expect(image.image).toHaveClass(styles.image);
    expect(image.image).not.toHaveClass(styles.iconInitials);

    const initials = renderAvatar({ name: 'Katri Athokas' });

    expect(initials.initials).toHaveClass(styles.iconInitials);
    expect(initials.initials).not.toHaveClass(styles.image);

    const expected: Array<[AvatarSize, string]> = [
      [16, styles.icon12],
      [20, styles.icon16],
      [24, styles.icon16],
      [28, styles.icon20],
      [40, styles.icon20],
      [48, styles.icon24],
      [56, styles.icon28],
      [64, styles.icon32],
      [72, styles.icon32],
      [96, styles.icon48],
    ];
    const all = [
      styles.icon12,
      styles.icon16,
      styles.icon20,
      styles.icon24,
      styles.icon28,
      styles.icon32,
      styles.icon48,
    ];

    expected.forEach(([size, className]) => {
      const { icon } = renderAvatar({ size });

      expect(icon).toHaveClass(styles.iconInitials);
      expect(icon).toHaveClass(className);
      all.filter(candidate => candidate !== className).forEach(candidate => expect(icon).not.toHaveClass(candidate));
    });
  });

  it('appends the active state to the accessible name', () => {
    const labelled = renderAvatar({ active: 'active', name: 'Katri Athokas' });

    expect(labelled.root.getAttribute('aria-label')).toBe('Katri Athokas active');
    expect(labelled.activeLabel).toBeNull();

    expect(renderAvatar({ active: 'inactive', name: 'Katri Athokas' }).root.getAttribute('aria-label')).toBe(
      'Katri Athokas inactive',
    );

    const labelledBy = renderAvatar({ active: 'inactive', initials: 'ZZ' });
    const tokens = labelledBy.root.getAttribute('aria-labelledby')!.split(' ');

    expect(labelledBy.activeLabel).not.toBeNull();
    expect(labelledBy.activeLabel!.textContent).toBe('inactive');
    expect(tokens).toHaveLength(2);
    expect(tokens[0]).toBe(labelledBy.initials!.id);
    expect(tokens[1]).toBe(labelledBy.activeLabel!.id);
    expect(labelledBy.root.children[labelledBy.root.children.length - 1]).toBe(labelledBy.activeLabel);

    expect(renderAvatar({ active: 'active', initials: 'ZZ' }).activeLabel!.textContent).toBe('active');
  });

  it('leaves a consumer-supplied accessible name untouched', () => {
    const withLabel = renderAvatar({
      'aria-label': 'Mine',
      active: 'active',
      name: 'Katri Athokas',
    } as React.ComponentProps<typeof Avatar>);

    expect(withLabel.root.getAttribute('aria-label')).toBe('Mine');
    expect(withLabel.activeLabel).toBeNull();

    const withLabelledBy = renderAvatar({
      'aria-labelledby': 'outside',
      active: 'inactive',
      initials: 'ZZ',
    } as React.ComponentProps<typeof Avatar>);

    expect(withLabelledBy.root.getAttribute('aria-labelledby')).toBe('outside');
    expect(withLabelledBy.activeLabel).toBeNull();
  });

  it('adds no active element or name suffix when the state is unset', () => {
    const { root, activeLabel } = renderAvatar({ name: 'Katri Athokas' });

    expect(root.getAttribute('aria-label')).toBe('Katri Athokas');
    expect(activeLabel).toBeNull();
  });

  it('lands native props on the root and forwards the ref to it', () => {
    const ref = React.createRef<HTMLElement>();
    const { container } = render(
      <Avatar
        {...({ className: 'consumer', 'data-testid': 't', id: 'my-id', style: { margin: 4 } } as React.ComponentProps<
          typeof Avatar
        >)}
        ref={ref}
      />,
    );
    const root = container.firstElementChild as HTMLElement;

    expect(root.id).toBe('my-id');
    expect(root.getAttribute('data-testid')).toBe('t');
    expect(root.getAttribute('role')).toBe('img');
    expect(root).toHaveClass('consumer');
    expect(root.style.margin).toBe('4px');
    expect(ref.current).toBe(root);
    expect(root.tagName).toBe('SPAN');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      active: 'inactive',
      activeAppearance: 'ring-shadow',
      color: 'brand',
      components: { root: 'span', initials: 'span', icon: 'span', image: 'img' },
      icon: { className: 'consumer-icon' },
      image: { className: 'consumer-image' },
      initials: { className: 'consumer-initials' },
      root: { className: 'consumer' },
      shape: 'square',
      size: 64,
    } as unknown as AvatarState;

    const styled = useAvatarStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.icon).not.toBe(state.icon);
    expect(styled.image).not.toBe(state.image);
    expect(styled.initials).not.toBe(state.initials);

    expect(state.root.className).toBe('consumer');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(state.image!.className).toBe('consumer-image');
    expect(state.initials!.className).toBe('consumer-initials');
    expect('data-size' in state.root).toBe(false);

    const rootClasses = styled.root.className!.split(/\s+/);

    expect(rootClasses).toContain(styles.root);
    expect(rootClasses).toContain(styles.squareLarge);
    expect(rootClasses).toContain(styles.ring);
    expect(rootClasses).toContain(styles.ringThicker);
    expect(rootClasses).toContain(styles.shadow);
    expect(rootClasses).toContain(styles.shadow16);
    expect(rootClasses).toContain(styles.inactive);
    expect(rootClasses).toContain(styles.brand);
    expect(rootClasses).toContain('consumer');
    expect(styled.icon!.className!.split(/\s+/)).toContain(styles.icon32);
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => renderAvatar()).not.toThrow();
    expect(() => renderAvatar({ name: 'Katri Athokas', size: 16 })).not.toThrow();
    expect(() => renderAvatar({ color: 'colorful', image: { src: 'x.png' }, name: 'Katri Athokas' })).not.toThrow();
    expect(() => renderAvatar({ active: 'inactive', initials: 'ZZ' })).not.toThrow();
    expect(() => renderAvatar({ icon: null })).not.toThrow();

    sizes.forEach(size => {
      (['ring', 'shadow', 'ring-shadow'] as const).forEach(activeAppearance => {
        expect(() =>
          renderAvatar({ active: 'active', activeAppearance, name: 'Katri Athokas', shape: 'square', size }),
        ).not.toThrow();
      });
    });
  });
});
