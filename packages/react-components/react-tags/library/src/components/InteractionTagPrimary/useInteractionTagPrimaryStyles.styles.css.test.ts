import type { InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import {
  interactionTagPrimaryClassNames,
  useInteractionTagPrimaryStyles_unstable,
} from './useInteractionTagPrimaryStyles.styles.css';

jest.mock('./InteractionTagPrimary.module.css', () => ({
  brand: 'css-brand',
  circular: 'css-circular',
  disabled: 'css-disabled',
  'extra-small': 'css-extra-small',
  filled: 'css-filled',
  'fui-Icon-filled': 'css-fui-Icon-filled',
  'fui-Icon-regular': 'css-fui-Icon-regular',
  hasSecondaryAction: 'css-hasSecondaryAction',
  medium: 'css-medium',
  outline: 'css-outline',
  root: 'css-root',
  rounded: 'css-rounded',
  selected: 'css-selected',
  small: 'css-small',
  withoutMedia: 'css-withoutMedia',
}));
jest.mock('../Tag/TagSlots.module.css', () => ({
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
    components: { root: 'div', media: 'div', icon: 'div', primaryText: 'div', secondaryText: 'div' },
    size: 'medium',
    shape: 'rounded',
    appearance: 'filled',
    disabled: false,
    selected: false,
    hasSecondaryAction: false,
    root: { className: 'caller-root' },
    media: { className: 'caller-media' },
    icon: { className: 'caller-icon' },
    primaryText: { className: 'caller-primaryText' },
    secondaryText: { className: 'caller-secondaryText' },
  } as InteractionTagPrimaryState);

describe('useInteractionTagPrimaryStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useInteractionTagPrimaryStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(interactionTagPrimaryClassNames.root);
    expect(state.media?.className?.split(' ').slice(-1)[0]).toBe('caller-media');
    expect(state.media?.className).toContain(interactionTagPrimaryClassNames.media);
    expect(state.icon?.className?.split(' ').slice(-1)[0]).toBe('caller-icon');
    expect(state.icon?.className).toContain(interactionTagPrimaryClassNames.icon);
    expect(state.primaryText?.className?.split(' ').slice(-1)[0]).toBe('caller-primaryText');
    expect(state.primaryText?.className).toContain(interactionTagPrimaryClassNames.primaryText);
    expect(state.secondaryText?.className?.split(' ').slice(-1)[0]).toBe('caller-secondaryText');
    expect(state.secondaryText?.className).toContain(interactionTagPrimaryClassNames.secondaryText);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.media = undefined;
    state.icon = undefined;
    state.secondaryText = undefined;
    useInteractionTagPrimaryStyles_unstable(state);
    expect(state.media).toBeUndefined();
    expect(state.icon).toBeUndefined();
    expect(state.secondaryText).toBeUndefined();
  });
  it('places disabled state on its owner', () => {
    const state = createState();
    state.disabled = true;
    useInteractionTagPrimaryStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.media?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.icon?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.primaryText?.className?.split(' ')).not.toContain('css-disabled');
    expect(state.secondaryText?.className?.split(' ')).not.toContain('css-disabled');
  });
  it('places selected state on its owner', () => {
    const state = createState();
    state.selected = true;
    useInteractionTagPrimaryStyles_unstable(state);
    expect(state.root.className).toContain('css-selected');
    expect(state.media?.className?.split(' ')).not.toContain('css-selected');
    expect(state.icon?.className?.split(' ')).not.toContain('css-selected');
    expect(state.primaryText?.className?.split(' ')).not.toContain('css-selected');
    expect(state.secondaryText?.className?.split(' ')).not.toContain('css-selected');
  });
  it('places size state on its owner', () => {
    const state = createState();
    state.size = 'small';
    useInteractionTagPrimaryStyles_unstable(state);
    expect(state.root.className).toContain('css-small');
    expect(state.media?.className?.split(' ')).not.toContain('css-small');
    expect(state.icon?.className?.split(' ')).not.toContain('css-small');
    expect(state.primaryText?.className?.split(' ')).not.toContain('css-small');
    expect(state.secondaryText?.className?.split(' ')).not.toContain('css-small');
  });
});
