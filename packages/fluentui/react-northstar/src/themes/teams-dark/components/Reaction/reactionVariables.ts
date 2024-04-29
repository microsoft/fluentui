import { ReactionVariables } from '../../../teams/components/Reaction/reactionVariables';

export const reactionVariables = (siteVars: any): Partial<ReactionVariables> => ({
  meReactingColor: siteVars.colors.brand[400],
  meReactingColorHover: siteVars.colors.brand[300],
  otherReactingColor: siteVars.colors.grey[300],
  otherReactingColorHover: siteVars.colors.white,
});
