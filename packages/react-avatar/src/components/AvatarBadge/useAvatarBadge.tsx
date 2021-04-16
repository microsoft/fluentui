import * as React from 'react';
import { AvatarBadgeProps, avatarBadgeShorthandProps, AvatarBadgeState } from './AvatarBadge.types';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-utilities';

const mergeProps = makeMergeProps<AvatarBadgeState>({ deepMerge: avatarBadgeShorthandProps });

export const useAvatarBadge = (
  props: AvatarBadgeProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AvatarBadgeProps,
): AvatarBadgeState => {
  const state = mergeProps(
    {
      as: 'span',
      ref,
      icon: { as: 'span' },
    },
    defaultProps && resolveShorthandProps(defaultProps, avatarBadgeShorthandProps),
    resolveShorthandProps(props, avatarBadgeShorthandProps),
    {
      state: props.state || (props.children as AvatarBadgeProps['state']), // Treat children as state fallback
      children: undefined,
    },
  );

  return state;
};
