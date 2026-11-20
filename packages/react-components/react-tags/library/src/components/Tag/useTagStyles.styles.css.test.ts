import {
  useIconStyles,
  useMediaStyles,
  usePrimaryTextStyles,
  useSecondaryTextBaseClassName,
} from './useTagStyles.styles.css';
import type { TagState } from './Tag.types';
import { tagClassNames, useTagStyles_unstable } from './useTagStyles.styles.css';

jest.mock('./Tag.module.css', () => ({
  brand: 'css-brand',
  circular: 'css-circular',
  disabled: 'css-disabled',
  dismissIcon: 'css-dismissIcon',
  'extra-small': 'css-extra-small',
  filled: 'css-filled',
  medium: 'css-medium',
  outline: 'css-outline',
  root: 'css-root',
  rounded: 'css-rounded',
  selected: 'css-selected',
  small: 'css-small',
  withoutDismiss: 'css-withoutDismiss',
  withoutMedia: 'css-withoutMedia',
}));
jest.mock('./TagSlots.module.css', () => ({
  'extra-small': 'shared-extra-small',
  icon: 'shared-icon',
  'icon-extra-small': 'shared-icon-extra-small',
  'icon-medium': 'shared-icon-medium',
  'icon-small': 'shared-icon-small',
  media: 'shared-media',
  'media-extra-small': 'shared-media-extra-small',
  'media-medium': 'shared-media-medium',
  'media-small': 'shared-media-small',
  medium: 'shared-medium',
  primaryText: 'shared-primaryText',
  'primaryText-extra-small': 'shared-primaryText-extra-small',
  'primaryText-medium': 'shared-primaryText-medium',
  'primaryText-small': 'shared-primaryText-small',
  'primaryText-withSecondaryText': 'shared-primaryText-withSecondaryText',
  'primaryText-withoutSecondaryText': 'shared-primaryText-withoutSecondaryText',
  secondaryText: 'shared-secondaryText',
  small: 'shared-small',
  withSecondaryText: 'shared-withSecondaryText',
  withoutSecondaryText: 'shared-withoutSecondaryText',
}));

const createState = () =>
  ({
    components: {
      root: 'div',
      media: 'div',
      icon: 'div',
      primaryText: 'div',
      secondaryText: 'div',
      dismissIcon: 'div',
    },
    size: 'medium',
    shape: 'rounded',
    appearance: 'filled',
    disabled: false,
    selected: false,
    root: { className: 'caller-root' },
    media: { className: 'caller-media' },
    icon: { className: 'caller-icon' },
    primaryText: { className: 'caller-primaryText' },
    secondaryText: { className: 'caller-secondaryText' },
    dismissIcon: { className: 'caller-dismissIcon' },
  } as TagState);

describe('useTagStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useTagStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(tagClassNames.root);
    expect(state.media?.className?.split(' ').slice(-1)[0]).toBe('caller-media');
    expect(state.media?.className).toContain(tagClassNames.media);
    expect(state.icon?.className?.split(' ').slice(-1)[0]).toBe('caller-icon');
    expect(state.icon?.className).toContain(tagClassNames.icon);
    expect(state.primaryText?.className?.split(' ').slice(-1)[0]).toBe('caller-primaryText');
    expect(state.primaryText?.className).toContain(tagClassNames.primaryText);
    expect(state.secondaryText?.className?.split(' ').slice(-1)[0]).toBe('caller-secondaryText');
    expect(state.secondaryText?.className).toContain(tagClassNames.secondaryText);
    expect(state.dismissIcon?.className?.split(' ').slice(-1)[0]).toBe('caller-dismissIcon');
    expect(state.dismissIcon?.className).toContain(tagClassNames.dismissIcon);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.media = undefined;
    state.icon = undefined;
    state.secondaryText = undefined;
    state.dismissIcon = undefined;
    useTagStyles_unstable(state);
    expect(state.media).toBeUndefined();
    expect(state.icon).toBeUndefined();
    expect(state.secondaryText).toBeUndefined();
    expect(state.dismissIcon).toBeUndefined();
  });
  it('places disabled state on its owner', () => {
    const state = createState();
    state.disabled = true;
    useTagStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.media?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.icon?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.primaryText?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.secondaryText?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.dismissIcon?.className?.split(' ')).not.toContain('css-disabled');
  });
  it('places selected state on its owner', () => {
    const state = createState();
    state.selected = true;
    useTagStyles_unstable(state);
    expect(state.root.className).toContain('css-selected');
    expect(state.media?.className?.split(' ')).not.toContain('css-selected');
    expect(state.icon?.className?.split(' ')).not.toContain('css-selected');
    expect(state.primaryText?.className?.split(' ')).not.toContain('css-selected');
    expect(state.secondaryText?.className?.split(' ')).not.toContain('css-selected');
    expect(state.dismissIcon?.className?.split(' ')).not.toContain('css-selected');
  });
  it('places size state on its owner', () => {
    const state = createState();
    state.size = 'small';
    useTagStyles_unstable(state);
    expect(state.root.className).toContain('css-small');
    expect(state.media?.className?.split(' ')).not.toContain('css-small');
    expect(state.icon?.className?.split(' ')).not.toContain('css-small');
    expect(state.primaryText?.className?.split(' ')).not.toContain('css-small');
    expect(state.secondaryText?.className?.split(' ')).not.toContain('css-small');
    expect(state.dismissIcon?.className?.split(' ')).not.toContain('css-small');
  });
});

describe('Tag CSS helper exports', () => {
  it('preserves independent style maps without mutating component state', () => {
    expect(useIconStyles()).toEqual({
      base: 'shared-icon',
      medium: 'shared-icon-medium',
      small: 'shared-icon-small',
      'extra-small': 'shared-icon-extra-small',
    });
    expect(useMediaStyles()).toEqual({
      base: 'shared-media',
      medium: 'shared-media-medium',
      small: 'shared-media-small',
      'extra-small': 'shared-media-extra-small',
    });
    expect(usePrimaryTextStyles()).toEqual({
      base: 'shared-primaryText',
      medium: 'shared-primaryText-medium',
      small: 'shared-primaryText-small',
      'extra-small': 'shared-primaryText-extra-small',
      withSecondaryText: 'shared-primaryText-withSecondaryText',
      withoutSecondaryText: 'shared-primaryText-withoutSecondaryText',
    });
    expect(useSecondaryTextBaseClassName()).toBe('shared-secondaryText');
  });
});
