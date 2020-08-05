import { ItemType } from '../../../../themes/types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray, pxToRem } from '../../../../utils';

export const segmentColorAreas = stringLiteralsArray('foreground');
export type SegmentColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof segmentColorAreas>>;

export interface SkeletonVariables {
  colorScheme?: SegmentColorSchemeMapping;
  lineMargin?: string;
}

export const skeletonVariables = (siteVariables): SkeletonVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorAreas),
    lineMargin: `0 0 ${pxToRem(2)} 0`,
  };
};
