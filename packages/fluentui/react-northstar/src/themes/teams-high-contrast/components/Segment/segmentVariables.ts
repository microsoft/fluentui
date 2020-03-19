import { SegmentVariables } from '../../../teams/components/Segment/segmentVariables';

export default (siteVars: any): Partial<SegmentVariables> => ({
  disabledColor: siteVars.colors.black,
  disabledBackgroundColor: siteVars.accessibleGreen,
});
