import { SkeletonVariables } from '../../../teams/components/Skeleton/SkeletonVariables';

export const skeletonVariables = (siteVars: any): Partial<SkeletonVariables> => ({
  lineBackground: siteVars.colorScheme.brand.background,
  shapeBackground: siteVars.colorScheme.brand.background,
});
