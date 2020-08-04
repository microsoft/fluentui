import { ItemType } from '../../../../themes/types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray, pxToRem } from '../../../../utils';

export const segmentColorAreas = stringLiteralsArray('foreground');
export type SegmentColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof segmentColorAreas>>;

export interface SkeletonVariables {
  colorScheme?: SegmentColorSchemeMapping;
  marginLineBottom?: string;
  marginLineTop?: string;
}

export const skeletonVariables = (siteVariables): SkeletonVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorAreas),
    marginLineBottom: pxToRem(2),
    marginLineTop: pxToRem(8),
  };
};
