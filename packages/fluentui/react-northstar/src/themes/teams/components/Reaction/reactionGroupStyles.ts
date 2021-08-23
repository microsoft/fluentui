import type { ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { ReactionGroupStylesProps } from '../../../../components/Reaction/ReactionGroup';
import type { ReactionGroupVariables } from './reactionGroupVariables';

export const reactionGroupStyles: ComponentSlotStylesPrepared<ReactionGroupStylesProps, ReactionGroupVariables> = {
  root: () => ({}),
  reaction: ({ variables: v }) => ({
    ':not(:last-child)': {
      marginRight: v.reactionSpacing,
    },
  }),
};
