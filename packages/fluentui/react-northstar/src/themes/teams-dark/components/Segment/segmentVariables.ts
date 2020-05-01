import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables';

export default (siteVars: any): Partial<SegmentVariables> => ({
  disabledColor: siteVars.colors.grey[450],
  disabledBackgroundColor: siteVars.colors.grey[550],
});
