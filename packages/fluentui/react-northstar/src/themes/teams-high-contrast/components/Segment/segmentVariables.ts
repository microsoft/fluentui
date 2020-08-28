import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables';

export const segmentVariables = (siteVars: any): Partial<SegmentVariables> => ({
  disabledColor: siteVars.colors.black,
  disabledBackgroundColor: siteVars.accessibleGreen,
});
