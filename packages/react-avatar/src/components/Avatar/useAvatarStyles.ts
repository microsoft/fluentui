import { ax, makeStyles } from '@fluentui/react-make-styles';
import { AvatarState, defaultAvatarSize } from './Avatar.types';

//
// TODO: All animation constants should go to theme or globals?
// https://github.com/microsoft/fluentui/issues/16372#issuecomment-778240665

const animationDuration = {
  duration50: '50ms',
  duration100: '100ms',
  duration150: '150ms',
  duration200: '200ms',
  duration300: '300ms',
  duration400: '400ms',
  duration500: '500ms',
};

const animationTiming = {
  ultraFast: animationDuration.duration50,
  faster: animationDuration.duration100,
  fast: animationDuration.duration150,
  normal: animationDuration.duration200,
  slow: animationDuration.duration300,
  slower: animationDuration.duration400,
  ultraSlow: animationDuration.duration500,
};

const animationLines = {
  decelerateMax: 'cubic-bezier(0.00,0.00,0.00,1.00)',
  decelerateMid: 'cubic-bezier(0.10,0.90,0.20,1.00)',
  decelerateMin: 'cubic-bezier(0.33,0.00,0.10,1.00)',
  accelerateMax: 'cubic-bezier(1.00,0.00,1.00,1.00)',
  accelerateMid: 'cubic-bezier(0.90,0.10,1.00,0.20)',
  accelerateMin: 'cubic-bezier(0.80,0.00,0.78,1.00)',
  maxEasyEase: 'cubic-bezier(0.80,0.00,0.20,1.00)',
  easyEase: 'cubic-bezier(0.33,0.00,0.67,1.00)',
  linear: 'linear',
};

const animations = {
  fastOutSlowInMax: animationLines.decelerateMax,
  fastOutSlowInMid: animationLines.decelerateMid,
  fastOutSlowInMin: animationLines.decelerateMin,
  slowOutFastInMax: animationLines.accelerateMax,
  slowOutFastInMid: animationLines.accelerateMid,
  slowOutFastInMin: animationLines.accelerateMin,
  fastEase: animationLines.maxEasyEase,
  normalEase: animationLines.easyEase,
  nullEasing: animationLines.linear,
};

const iconSize = {
  small: '12px',
  medium: '16px',
  large: '24px',
  larger: '40px',
  largest: '48px',
};

const activeRing = (s: AvatarState) =>
  (s.active === 'active' || s.active === 'inactive') &&
  (!s.activeDisplay ||
    s.activeDisplay === 'ring' ||
    s.activeDisplay === 'ring-glow' ||
    s.activeDisplay === 'ring-shadow');

const activeShadow = (s: AvatarState) =>
  (s.active === 'active' || s.active === 'inactive') &&
  (s.activeDisplay === 'shadow' || s.activeDisplay === 'ring-shadow');

const activeGlow = (s: AvatarState) =>
  (s.active === 'active' || s.active === 'inactive') && (s.activeDisplay === 'glow' || s.activeDisplay === 'ring-glow');

const useStyles = makeStyles<AvatarState>([
  [
    null,
    theme => ({
      display: 'inline-block',
      flexShrink: 0,
      position: 'relative',
      verticalAlign: 'middle',

      borderRadius: theme.global.borderRadius.circular,

      width: `${defaultAvatarSize}px`,
      height: `${defaultAvatarSize}px`,

      fontFamily: theme.global.type.fontFamilies.base,
      fontSize: theme.global.type.fontSizes.base[300],
      fontWeight: theme.global.type.fontWeights.semibold,
    }),
  ],

  [s => s.size === 20, { width: '20px', height: '20px' }],
  [s => s.size === 24, { width: '24px', height: '24px' }],
  [s => s.size === 28, { width: '28px', height: '28px' }],
  [s => s.size === 32, { width: '32px', height: '32px' }],
  [s => s.size === 36, { width: '36px', height: '36px' }],
  [s => s.size === 40, { width: '40px', height: '40px' }],
  [s => s.size === 48, { width: '48px', height: '48px' }],
  [s => s.size === 56, { width: '56px', height: '56px' }],
  [s => s.size === 64, { width: '64px', height: '64px' }],
  [s => s.size === 72, { width: '72px', height: '72px' }],
  [s => s.size === 96, { width: '96px', height: '96px' }],
  [s => s.size === 120, { width: '120px', height: '120px' }],
  [s => s.size === 128, { width: '128px', height: '128px' }],

  [s => s.size < 28, theme => ({ fontSize: theme.global.type.fontSizes.base[100] })],
  [s => s.size >= 28, theme => ({ fontSize: theme.global.type.fontSizes.base[200] })],
  [s => s.size >= 32, theme => ({ fontSize: theme.global.type.fontSizes.base[300] })],
  [s => s.size >= 48, theme => ({ fontSize: theme.global.type.fontSizes.base[400] })],
  [s => s.size >= 64, theme => ({ fontSize: theme.global.type.fontSizes.base[500] })],
  [s => s.size >= 120, theme => ({ fontSize: theme.global.type.fontSizes.base[600] })],

  [s => s.size < 28, theme => ({ fontWeight: theme.global.type.fontWeights.regular })],
  [s => s.size >= 28, theme => ({ fontWeight: theme.global.type.fontWeights.semibold })],

  [s => s.square && s.size < 28, theme => ({ borderRadius: theme.global.borderRadius.small })],
  [s => s.square && s.size >= 28, theme => ({ borderRadius: theme.global.borderRadius.medium })],
  [s => s.square && s.size >= 56, theme => ({ borderRadius: theme.global.borderRadius.large })],
  [s => s.square && s.size >= 96, theme => ({ borderRadius: theme.global.borderRadius.xLarge })],

  [s => s.icon !== undefined, { fontWeight: 'initial' }],
  [s => s.icon !== undefined && s.size < 28, { fontSize: iconSize.small }],
  [s => s.icon !== undefined && s.size >= 28, { fontSize: iconSize.medium }],
  [s => s.icon !== undefined && s.size >= 48, { fontSize: iconSize.large }],
  [s => s.icon !== undefined && s.size >= 96, { fontSize: iconSize.larger }],
  [s => s.icon !== undefined && s.size >= 120, { fontSize: iconSize.largest }],

  [
    s => s.active === 'active' || s.active === 'inactive',
    {
      transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
      transition:
        `transform ${animationTiming.ultraSlow} ${animations.fastEase}, ` +
        `opacity ${animationTiming.faster} ${animations.nullEasing}`,

      ':before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        borderRadius: 'inherit',
        transition:
          `margin ${animationTiming.ultraSlow} ${animations.fastEase}, ` +
          `opacity ${animationTiming.slower} ${animations.nullEasing}`,
      },
    },
  ],

  [
    activeRing,
    theme => ({
      ':before': {
        borderColor: theme.alias.color.neutral.brandForeground, // TODO: use valid token
        borderStyle: 'solid',
      },
    }),
  ],
  [
    s => activeRing(s) && s.size < 48,
    theme => ({
      ':before': {
        margin: `calc(-2 * ${theme.global.strokeWidth.thick})`,
        borderWidth: theme.global.strokeWidth.thick,
      },
    }),
  ],
  [
    s => activeRing(s) && s.size >= 48,
    theme => ({
      ':before': {
        margin: `calc(-2 * ${theme.global.strokeWidth.thicker})`,
        borderWidth: theme.global.strokeWidth.thicker,
      },
    }),
  ],
  [
    s => activeRing(s) && s.size >= 72,
    theme => ({
      ':before': {
        margin: `calc(-2 * ${theme.global.strokeWidth.thickest})`,
        borderWidth: theme.global.strokeWidth.thickest,
      },
    }),
  ],

  [s => activeShadow(s) && s.size < 32, theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow4 } })],
  [s => activeShadow(s) && s.size >= 32, theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow8 } })],
  [s => activeShadow(s) && s.size >= 48, theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow16 } })],
  [s => activeShadow(s) && s.size >= 72, theme => ({ ':before': { boxShadow: theme.alias.shadow.shadow28 } })],

  // TODO: use proper tokens instead of "rgba(0,120,212,0.3)"
  [
    s => activeGlow(s) && s.size < 32,
    theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow4}, 0 0 4px 2px rgba(0,120,212,0.3)` } }),
  ],
  [
    s => activeGlow(s) && s.size >= 32,
    theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow8}, 0 0 8px 2px rgba(0,120,212,0.3)` } }),
  ],
  [
    s => activeGlow(s) && s.size >= 48,
    theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow16}, 0 0 8px 2px rgba(0,120,212,0.3)` } }),
  ],
  [
    s => activeGlow(s) && s.size >= 72,
    theme => ({ ':before': { boxShadow: `${theme.alias.shadow.shadow28}, 0 0 28px 4px rgba(0,120,212,0.3)` } }),
  ],

  // Note: The inactive styles must be after all of the active/activeRing/activeShadow/activeGlow styles,
  // so they appropriately override the margin, etc.
  [
    s => s.active === 'inactive',
    {
      opacity: '0.8',
      transform: 'scale(0.875)',
      transition:
        `transform ${animationTiming.ultraSlow} ${animations.fastOutSlowInMin}, ` +
        `opacity ${animationTiming.faster} ${animations.nullEasing}`,

      ':before': {
        margin: 0,
        opacity: 0,
        transition:
          `margin ${animationTiming.ultraSlow} ${animations.fastOutSlowInMin}, ` +
          `opacity ${animationTiming.slower} ${animations.nullEasing}`,
      },
    },
  ],
]);

const useBadgeStyles = makeStyles<AvatarState>([
  [
    null,
    {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  ],

  // TODO apply the correct badge sizes once the new Badge component is available
  [s => s.size < 24, { '--badge-size': '5px' }],
  [s => s.size >= 24, { '--badge-size': '6px' }],
  [s => s.size >= 28, { '--badge-size': '7px' }],
  [s => s.size >= 32, { '--badge-size': '8px' }],
  [s => s.size >= 36, { '--badge-size': '9px' }],
  [s => s.size >= 40, { '--badge-size': '10px' }],
  [s => s.size >= 48, { '--badge-size': '12px' }],
  [s => s.size >= 56, { '--badge-size': '14px' }],
  [s => s.size >= 64, { '--badge-size': '16px' }],
  [s => s.size >= 72, { '--badge-size': '18px' }],
  [s => s.size >= 96, { '--badge-size': '24px' }],
  [s => s.size >= 120, { '--badge-size': '30px' }],
  [s => s.size >= 128, { '--badge-size': '32px' }],
]);

const useImageStyles = makeStyles<AvatarState>([
  [
    null,
    {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',

      borderRadius: 'inherit',
      objectFit: 'cover', // TODO:  does not work in IE11
      verticalAlign: 'top',
    },
  ],
]);

const useLabelStyles = makeStyles<AvatarState>([
  [
    null,
    theme => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'top',
      textAlign: 'center',
      borderRadius: 'inherit',

      color: theme.alias.color.neutral.neutralForeground3,
      background: theme.alias.color.neutral.neutralBackground6,
    }),
  ],
  [
    s => s.colorVariant === 'brand',
    theme => ({
      color: theme.alias.color.neutral.neutralForegroundInverted,
      background: theme.alias.color.brand.brandBackground,
    }),
  ],
]);

export const useAvatarStyles = (state: AvatarState): AvatarState => {
  state.className = ax(useStyles(state), state.className);
  state.badge.className = ax(useBadgeStyles(state), state.badge.className);
  state.image.className = ax(useImageStyles(state), state.image.className);
  state.label.className = ax(useLabelStyles(state), state.label.className);

  return state;
};
