import { pxToRem } from '../../../../utils';

export interface ReactionGroupVariables {
  reactionSpacing: string;
}

export default (): ReactionGroupVariables => ({
  reactionSpacing: pxToRem(8),
});
