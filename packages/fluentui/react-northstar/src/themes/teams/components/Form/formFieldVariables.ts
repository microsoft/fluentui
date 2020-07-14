import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray, pxToRem } from '../../../../utils';

export const formFieldColorAreas = stringLiteralsArray('foreground', 'background');

export type formFieldColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof formFieldColorAreas>>;

export interface FormFieldVariables {
  colorScheme?: formFieldColorSchemeMapping;
  messagePaddingLeft?: string;
}

export const formFieldVariables = (siteVariables: any): FormFieldVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, formFieldColorAreas),
  messagePaddingLeft: pxToRem(12),
});
