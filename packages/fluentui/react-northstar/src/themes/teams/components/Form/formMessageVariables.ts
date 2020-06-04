import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray } from '../../../../utils';

export const formMessageColorAreas = stringLiteralsArray('foreground');

export type formMessageColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof formMessageColorAreas>>;

export interface FormMessageVariables {
  colorScheme?: formMessageColorSchemeMapping;
}

export default (siteVariables: any): FormMessageVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, formMessageColorAreas),
});
