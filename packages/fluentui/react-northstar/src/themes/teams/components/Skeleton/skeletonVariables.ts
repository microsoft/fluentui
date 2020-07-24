import { ItemType } from '../../../../themes/types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import { stringLiteralsArray } from '../../../../utils';

export const segmentColorAreas = stringLiteralsArray('foreground');
export type SegmentColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof segmentColorAreas>>;

export interface SkeletonVariables {
  colorScheme: SegmentColorSchemeMapping;
}

export const skeletonVariables = (siteVariables): SkeletonVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, segmentColorAreas),
  };
};
