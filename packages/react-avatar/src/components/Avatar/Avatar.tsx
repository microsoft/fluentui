import * as React from 'react';
import { ax, makeStyles } from '@fluentui/react-make-styles';
import { useFocusRects, nullRender } from '@fluentui/utilities';

import { Badge } from '../Badge/Badge';
import { AvatarProps, AvatarState } from './Avatar.types';
import { renderAvatar } from './renderAvatar';
import { useAvatar } from './useAvatar';

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

const useStyles = makeStyles<AvatarState>([
  [
    null,
    tokens => ({
      display: 'inline-block',
      flexShrink: 0,
      position: 'relative',
      verticalAlign: 'middle',

      borderRadius: tokens.global.borderRadius.circular,

      width: '32px',
      height: '32px',

      fontFamily: tokens.global.type.fontFamilies.base,
      fontSize: tokens.global.type.fontSizes.base[300],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],

  [
    s => s.size === 20,
    tokens => ({
      width: '20px',
      height: '20px',

      fontSize: tokens.global.type.fontSizes.base[100],
      fontWeight: tokens.global.type.fontWeights.regular,
    }),
  ],
  [
    s => s.size === 24,
    tokens => ({
      width: '24px',
      height: '24px',

      fontSize: tokens.global.type.fontSizes.base[100],
      fontWeight: tokens.global.type.fontWeights.regular,
    }),
  ],
  [
    s => s.size === 28,
    tokens => ({
      width: '28px',
      height: '28px',

      fontSize: tokens.global.type.fontSizes.base[200],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 32,
    tokens => ({
      width: '32px',
      height: '32px',

      fontSize: tokens.global.type.fontSizes.base[300],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 36,
    tokens => ({
      width: '36px',
      height: '36px',

      fontSize: tokens.global.type.fontSizes.base[300],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 40,
    tokens => ({
      width: '40px',
      height: '40px',

      fontSize: tokens.global.type.fontSizes.base[300],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 48,
    tokens => ({
      width: '48px',
      height: '48px',

      fontSize: tokens.global.type.fontSizes.base[400],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 56,
    tokens => ({
      width: '56px',
      height: '56px',

      fontSize: tokens.global.type.fontSizes.base[400],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 64,
    tokens => ({
      width: '64px',
      height: '64px',

      fontSize: tokens.global.type.fontSizes.base[500],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 72,
    tokens => ({
      width: '72px',
      height: '72px',

      fontSize: tokens.global.type.fontSizes.base[500],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 96,
    tokens => ({
      width: '96px',
      height: '96px',

      fontSize: tokens.global.type.fontSizes.base[500],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 120,
    tokens => ({
      width: '120px',
      height: '120px',

      fontSize: tokens.global.type.fontSizes.base[600],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],
  [
    s => s.size === 128,
    tokens => ({
      width: '128px',
      height: '128px',

      fontSize: tokens.global.type.fontSizes.base[600],
      fontWeight: tokens.global.type.fontWeights.semibold,
    }),
  ],

  [s => s.square, tokens => ({ borderRadius: tokens.global.borderRadius.medium })],
  [s => s.square && (s.size === 20 || s.size === 24), tokens => ({ borderRadius: tokens.global.borderRadius.small })],
  [
    s => s.square && (s.size === 56 || s.size === 64 || s.size === 72),
    tokens => ({ borderRadius: tokens.global.borderRadius.large }),
  ],
  [
    s => s.square && (s.size === 96 || s.size === 120 || s.size === 128),
    tokens => ({ borderRadius: tokens.global.borderRadius.xLarge }),
  ],

  [
    s => s.active === 'active' || s.active === 'inactive',
    {
      transform: 'perspective(1px)', // Work-around for text pixel snapping at the end of the animation
      // eslint-disable-next-line @fluentui/max-len
      transition: `transform ${animationTiming.ultraSlow} ${animations.fastEase}, opacity ${animationTiming.faster} ${animations.nullEasing}`,

      ':before': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        borderRadius: 'inherit',
        // eslint-disable-next-line @fluentui/max-len
        transition: `margin ${animationTiming.ultraSlow} ${animations.fastEase}, opacity ${animationTiming.slower} ${animations.nullEasing}`,
      },
    },
  ],
  [
    s => s.active === 'inactive',
    {
      opacity: '0.8',
      transform: 'scale(0.875)',
      // eslint-disable-next-line @fluentui/max-len
      transition: `transform ${animationTiming.ultraSlow} ${animations.fastOutSlowInMin}, opacity ${animationTiming.faster} ${animations.nullEasing}`,

      ':before': {
        margin: 0,
        opacity: 0,
        // eslint-disable-next-line @fluentui/max-len
        transition: `margin ${animationTiming.ultraSlow} ${animations.fastOutSlowInMin}, opacity ${animationTiming.slower} ${animations.nullEasing}`,
      },
    },
  ],

  [
    s => s.activeRing,
    tokens => ({
      ':before': {
        borderColor: tokens.alias.color.neutral.brandForeground, // TODO: use valid token
        borderStyle: 'solid',
        borderWidth: tokens.global.strokeWidth.thick,

        margin: `calc(-2 * ${tokens.global.strokeWidth.thick})`,
      },
    }),
  ],
  [
    s => s.activeRing && (s.size === 48 || s.size === 56 || s.size === 64),
    tokens => ({
      ':before': {
        margin: `calc(-2 * ${tokens.global.strokeWidth.thicker})`,
        borderWidth: tokens.global.strokeWidth.thicker,
      },
    }),
  ],
  [
    s => s.activeRing && (s.size === 72 || s.size === 96 || s.size === 120 || s.size === 128),
    tokens => ({
      ':before': {
        margin: `calc(-2 * ${tokens.global.strokeWidth.thickest})`,
        borderWidth: tokens.global.strokeWidth.thickest,
      },
    }),
  ],

  [
    s => s.activeShadow,
    tokens => ({
      ':before': { boxShadow: tokens.alias.shadow.shadow8 },
    }),
  ],
  [
    s => s.activeShadow && (s.size === 20 || s.size === 24 || s.size === 28),
    tokens => ({
      ':before': { boxShadow: tokens.alias.shadow.shadow4 },
    }),
  ],
  [
    s => s.activeShadow && (s.size === 48 || s.size === 56 || s.size === 64),
    tokens => ({
      ':before': { boxShadow: tokens.alias.shadow.shadow16 },
    }),
  ],
  [
    s => s.activeShadow && (s.size === 72 || s.size === 96 || s.size === 120 || s.size === 128),
    tokens => ({
      ':before': { boxShadow: tokens.alias.shadow.shadow28 },
    }),
  ],

  [
    s => s.activeGlow,
    tokens => ({
      ':before': {
        boxShadow: `${tokens.alias.shadow.shadow8}, 0 0 8px 2px ${tokens.alias.color.neutral.brandForeground}`,
      },
    }),
  ],
  [
    s => s.activeGlow && (s.size === 20 || s.size === 24 || s.size === 28),
    tokens => ({
      ':before': {
        boxShadow: `${tokens.alias.shadow.shadow4}, 0 0 4px 2px ${tokens.alias.color.neutral.brandForeground}`,
      },
    }),
  ],
  [
    s => s.activeGlow && (s.size === 48 || s.size === 56 || s.size === 64),
    tokens => ({
      ':before': {
        boxShadow: `${tokens.alias.shadow.shadow16}, 0 0 8px 2px ${tokens.alias.color.neutral.brandForeground}`,
      },
    }),
  ],
  [
    s => s.activeGlow && (s.size === 72 || s.size === 96 || s.size === 120 || s.size === 128),
    tokens => ({
      ':before': {
        boxShadow: `${tokens.alias.shadow.shadow28}, 0 0 28px 4px ${tokens.alias.color.neutral.brandForeground}`,
      },
    }),
  ],

  [
    s => s.hasIcon,
    {
      fontSize: '16px',
      fontWeight: 'initial',
    },
  ],
  [
    s => s.hasIcon && (s.size === 20 || s.size === 24),
    {
      fontSize: '12px',
    },
  ],

  [
    s => s.hasIcon && (s.size === 28 || s.size === 32 || s.size === 36 || s.size === 40),
    {
      fontSize: '16px',
    },
  ],
  [
    s => s.hasIcon && (s.size === 48 || s.size === 56 || s.size === 64 || s.size === 72),
    {
      fontSize: '24px',
    },
  ],
  [
    s => s.hasIcon && s.size === 96,
    {
      fontSize: '40px',
    },
  ],
  [
    s => s.hasIcon && (s.size === 120 || s.size === 128),
    {
      fontSize: '48px',
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

  [s => s.size === 20, { '--badge-size': 'calc(20px / 4)' }],
  [s => s.size === 24, { '--badge-size': 'calc(24px / 4)' }],
  [s => s.size === 28, { '--badge-size': 'calc(28px / 4)' }],
  [s => s.size === 32, { '--badge-size': 'calc(32px / 4)' }],
  [s => s.size === 36, { '--badge-size': 'calc(36px / 4)' }],
  [s => s.size === 40, { '--badge-size': 'calc(40px / 4)' }],
  [s => s.size === 48, { '--badge-size': 'calc(48px / 4)' }],
  [s => s.size === 56, { '--badge-size': 'calc(56px / 4)' }],
  [s => s.size === 64, { '--badge-size': 'calc(64px / 4)' }],
  [s => s.size === 72, { '--badge-size': 'calc(72px / 4)' }],
  [s => s.size === 96, { '--badge-size': 'calc(96px / 4)' }],
  [s => s.size === 120, { '--badge-size': 'calc(120px / 4)' }],
  [s => s.size === 128, { '--badge-size': 'calc(128px / 4)' }],
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
    tokens => ({
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

      color: tokens.alias.color.neutral.neutralForeground3,
      background: tokens.alias.color.neutral.neutralBackground6,
    }),
  ],
  [
    s => s.colorVariant === 'brand',
    tokens => ({
      color: tokens.alias.color.neutral.neutralForegroundInverted,
      background: tokens.alias.color.neutral.brandForeground,
    }),
  ],
]);

export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    badge: { as: props.badge ? Badge : nullRender },
  });

  state.className = ax(useStyles(state), state.className);

  state.badge.className = ax(useBadgeStyles(state), state.badge.className);
  state.image.className = ax(useImageStyles(state), state.image.className);
  state.label.className = ax(useLabelStyles(state), state.label.className);

  useFocusRects(state.ref);

  return renderAvatar(state);
});

Avatar.displayName = 'Avatar';
