import { ReactionVariables } from '../../../teams/components/Reaction/reactionVariables';

export const reactionVariables = (siteVars): Partial<ReactionVariables> => ({
  meReactingColor: siteVars.accessibleCyan,
  meReactingColorHover: siteVars.accessibleCyan,
  otherReactingColor: siteVars.accessibleYellow,
  otherReactingColorHover: siteVars.accessibleYellow,
});
