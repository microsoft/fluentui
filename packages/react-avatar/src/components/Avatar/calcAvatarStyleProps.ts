import { AvatarState, AvatarSizeValue, avatarSizeValues, AvatarTokenSet } from './Avatar.types';

/**
 * Additional state properties needed by Avatar's styling
 */
export interface AvatarStyleProps {
  size?: AvatarSizeValue;
  tokens?: AvatarTokenSet;
  inactive?: boolean;
  activeRing?: boolean;
  activeShadow?: boolean;
  activeGlow?: boolean;
}

/**
 * Updates Avatar's state object with style-specific properties
 */
export const calcAvatarStyleProps = (state: Readonly<AvatarState>): AvatarStyleProps => {
  const props: AvatarStyleProps = {};

  if (state.customSize) {
    // Make sure the size prop is set to the nearest standard size, when a custom size is used
    props.size = calcSizeClass(state.customSize);
    props.tokens = {
      width: `${state.customSize}px`,
      height: `${state.customSize}px`,
      ...state.tokens,
    };
  }

  if (state.active === true) {
    switch (state.activeDisplay) {
      default:
      case 'ring':
        props.activeRing = true;
        break;
      case 'shadow':
        props.activeShadow = true;
        break;
      case 'glow':
        props.activeGlow = true;
        break;
      case 'ring-shadow':
        props.activeRing = true;
        props.activeShadow = true;
        break;
      case 'ring-glow':
        props.activeRing = true;
        props.activeGlow = true;
        break;
    }
  } else if (state.active === false) {
    props.inactive = true;
  }

  return props;
};

/**
 * The "size class" of the avatar is the closest AvatarSizeValue that is less-or-equal to the given custom size.
 * This is used in scss style rules to pick the appropriate font size, icon size, etc.
 */
const calcSizeClass = (customSize: number): AvatarSizeValue => {
  // Note: deliberately skipping i = 0 because it's the default return value below
  for (let i = avatarSizeValues.length - 1; i > 0; i--) {
    if (customSize >= avatarSizeValues[i]) {
      return avatarSizeValues[i];
    }
  }

  return avatarSizeValues[0];
};
