import { ComponentSlotStylesPrepared } from '@fluentui/styles'
import { ReactionProps } from '../../../../components/Reaction/Reaction'
import { ReactionGroupVariables } from './reactionGroupVariables'

const reactionStyles: ComponentSlotStylesPrepared<ReactionProps, ReactionGroupVariables> = {
  root: () => ({}),
  reaction: ({ variables: v }) => ({
    ':not(:last-child)': {
      marginRight: v.reactionSpacing,
    },
  }),
}

export default reactionStyles
