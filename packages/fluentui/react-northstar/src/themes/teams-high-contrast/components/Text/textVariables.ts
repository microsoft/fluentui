import { TeamsTextVariables } from '../../../teams/components/Text/textVariables';

export default (siteVariables): Partial<TeamsTextVariables> => ({
  atMentionMeColor: siteVariables.accessibleYellow,
  atMentionOtherColor: siteVariables.accessibleYellow,
  disabledColor: siteVariables.accessibleGreen,
  errorColor: siteVariables.red,
  importantColor: siteVariables.red,
  successColor: siteVariables.colors.green[200],
  timestampColor: siteVariables.colors.white,
  timestampHoverColor: siteVariables.colors.white,
});
