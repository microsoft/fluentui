import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables';

export const segmentVariables = (siteVars: any): Partial<SegmentVariables> => ({
  disabledColor: siteVars.colors.grey[450],
  disabledBackgroundColor: siteVars.colors.grey[550],
});
