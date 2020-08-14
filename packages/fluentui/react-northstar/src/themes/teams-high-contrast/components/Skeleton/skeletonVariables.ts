import { SkeletonVariables } from '../../../teams/components/Skeleton/skeletonVariables';

export const skeletonVariables = (siteVars: any): Partial<SkeletonVariables> => ({
  lineBackground: siteVars.colorScheme.brand.background,
  shapeBackground: siteVars.colorScheme.brand.background,
});
