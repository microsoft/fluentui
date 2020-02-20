import * as _ from 'lodash';

const convertCssTimeToNumber = (time: string | undefined): number => {
  if (_.isNil(time) || time === 'initial' || time === 'inherit') {
    return 0;
  }

  if (!_.endsWith(time, 'ms') && !_.endsWith(time, 's')) {
    return 0;
  }

  const multiplier = _.endsWith(time, 'ms') ? 1 : 1000;
  const stringNumber = _.endsWith(time, 'ms') ? time.substring(0, time.length - 2) : time.substring(0, time.length - 1);

  return isNaN(_.toNumber(stringNumber)) ? 0 : multiplier * _.toNumber(stringNumber);
};

export default convertCssTimeToNumber;
