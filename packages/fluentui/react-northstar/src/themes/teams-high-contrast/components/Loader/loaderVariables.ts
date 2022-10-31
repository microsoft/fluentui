import { LoaderVariables } from '../../../teams/components/Loader/loaderVariables';

export const loaderVariables = (siteVariables: any): Partial<LoaderVariables> => ({
  svgTrackColor: siteVariables.colors.black,
});
