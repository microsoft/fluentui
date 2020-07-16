import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray, pxToRem } from '../../../../utils';

export const formMessageColorAreas = stringLiteralsArray('foreground');

export type formMessageColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof formMessageColorAreas>>;

export interface FormMessageVariables {
  colorScheme?: formMessageColorSchemeMapping;
  paddingLeft?: string;
}

export const formMessageVariables = (siteVariables: any): FormMessageVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, formMessageColorAreas),
  paddingLeft: pxToRem(12),
});
