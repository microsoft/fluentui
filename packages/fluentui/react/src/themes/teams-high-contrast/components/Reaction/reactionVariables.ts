import { ReactionVariables } from '../../../teams/components/Reaction/reactionVariables'

export default (siteVars): Partial<ReactionVariables> => ({
  meReactingColor: siteVars.accessibleCyan,
  meReactingColorHover: siteVars.accessibleCyan,
  otherReactingColor: siteVars.accessibleYellow,
  otherReactingColorHover: siteVars.accessibleYellow,
})
