import { convertCssTimeToNumber } from './convertCssTimeToNumber';
import * as _ from 'lodash';

export const calculateAnimationTimeout = (duration: string | undefined, delay?: string): number => {
  if (_.isNil(duration) || duration === 'inherit' || duration === 'initial') return 0;
  if (delay === 'inherit' || delay === 'initial') return 0;
  return convertCssTimeToNumber(duration) + convertCssTimeToNumber(delay);
};
