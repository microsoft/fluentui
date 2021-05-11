import { pxToRem } from '../../../../utils';

export interface ReactionGroupVariables {
  reactionSpacing: string;
}

export const reactionGroupVariables = (): ReactionGroupVariables => ({
  reactionSpacing: pxToRem(8),
});
