import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ReactionGroupStylesProps } from '../../../../components/Reaction/ReactionGroup';
import { ReactionGroupVariables } from './reactionGroupVariables';

export const reactionGroupStyles: ComponentSlotStylesPrepared<ReactionGroupStylesProps, ReactionGroupVariables> = {
  root: () => ({}),
  reaction: ({ variables: v }) => ({
    ':not(:last-child)': {
      marginRight: v.reactionSpacing,
    },
  }),
};
