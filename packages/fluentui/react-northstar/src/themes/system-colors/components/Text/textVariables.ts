import { TextVariables } from '../../../teams/components/Text/textVariables';

export const textVariables = (siteVariables): Partial<TextVariables> => ({
  atMentionMeColor: siteVariables.accessibleYellow,
  atMentionOtherColor: siteVariables.accessibleYellow,
  disabledColor: siteVariables.accessibleGreen,
  errorColor: siteVariables.red,
  importantColor: siteVariables.red,
  successColor: siteVariables.colors.green[200],
  timestampColor: siteVariables.colors.white,
});
