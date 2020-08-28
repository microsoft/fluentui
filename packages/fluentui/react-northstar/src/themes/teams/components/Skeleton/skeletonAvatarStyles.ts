import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonAvatarStylesProps } from '../../../../components/Skeleton/SkeletonAvatar';
import { SkeletonVariables } from './skeletonVariables';

export const skeletonAvatarStyles: ComponentSlotStylesPrepared<SkeletonAvatarStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '50%',
      background: v.buttonBackground,
      height: v.avatarMedium,
      width: v.avatarMedium,
      ...(p.size === 'smallest' && {
        height: v.avatarSmallest,
        width: v.avatarSmallest,
      }),
      ...(p.size === 'smaller' && {
        height: v.avatarSmaller,
        width: v.avatarSmaller,
      }),
      ...(p.size === 'small' && {
        height: v.avatarSmall,
        width: v.avatarSmall,
      }),
      ...(p.size === 'large' && {
        height: v.avatarLarge,
        width: v.avatarLarge,
      }),
      ...(p.size === 'larger' && {
        height: v.avatarLarger,
        width: v.avatarLarger,
      }),
      ...(p.size === 'largest' && {
        height: v.avatarLargest,
        width: v.avatarLargest,
      }),
    };
  },
};
