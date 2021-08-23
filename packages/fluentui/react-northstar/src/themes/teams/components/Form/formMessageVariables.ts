import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray, pxToRem } from '../../../../utils';
import type { ItemType } from '../../../types';
import type { TeamsSchemeMappingWithAreas } from '../../types';

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
