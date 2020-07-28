import { ItemType } from '../../../../themes/types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray } from '../../../../utils';

export const segmentColorAreas = stringLiteralsArray('foreground');
export type SegmentColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof segmentColorAreas>>;

export interface SegmentVariables {
  colorScheme: SegmentColorSchemeMapping;
  color: string;
  disabledColor: string;
  backgroundColor: string;
  disabledBackgroundColor: string;
  disabledBorderColor: string;
  borderRadius: string | number;
  borderStyle: string;
  borderWidth: string;
  boxShadow: string;
  padding: string;
}

export const segmentVariables = (siteVariables): SegmentVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorAreas),
    color: siteVariables.bodyColor,
    disabledColor: siteVariables.colors.grey[250],

    backgroundColor: siteVariables.bodyBackground,
    disabledBackgroundColor: siteVariables.colors.grey[150],

    disabledBorderColor: 'transparent',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: '2px 0 0 0',

    boxShadow: '0 1px 1px 1px rgba(34,36,38,.15)',
    padding: '1em',
  };
};
