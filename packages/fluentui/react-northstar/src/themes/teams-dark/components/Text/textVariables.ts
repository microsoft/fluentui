import { TextVariables } from '../../../teams/components/Text/textVariables';

export const textVariables = (siteVariables): Partial<TextVariables> => ({
  atMentionMeColor: siteVariables.colors.orange[300],
  atMentionOtherColor: siteVariables.colors.brand[400],
  disabledColor: siteVariables.colors.grey[450],
  importantColor: siteVariables.colors.red[300],
  successColor: siteVariables.colors.green[200],
});
