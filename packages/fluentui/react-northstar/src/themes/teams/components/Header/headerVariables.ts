import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray } from '../../../../utils';

export const headerColorAreas = stringLiteralsArray('foreground');
export type HeaderColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof headerColorAreas>>;

export interface HeaderVariables {
  colorScheme?: HeaderColorSchemeMapping;
  color: string;
  descriptionColor: string;
}

export const headerVariables = (siteVars: any): HeaderVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, headerColorAreas),
    color: siteVars.colors.grey[750],
    descriptionColor: undefined,
  };
};
