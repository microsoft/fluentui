import { TextVariables } from '../../../teams/components/Text/textVariables';

export const textVariables = (siteVars): Partial<TextVariables> => ({
  timestampColor: siteVars.colorScheme.default.foreground2,
});
