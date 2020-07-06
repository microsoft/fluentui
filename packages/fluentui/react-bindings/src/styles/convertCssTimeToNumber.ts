import * as _ from 'lodash';

export const convertCssTimeToNumber = (time: string | undefined): number => {
  if (_.isNil(time) || time === 'initial' || time === 'inherit') {
    return 0;
  }
  const lastTwoCharacters = time.slice(-2);
  if (lastTwoCharacters !== 'ms' && lastTwoCharacters[1] !== 's') {
    return 0;
  }

  const isMs = lastTwoCharacters === 'ms';
  const multiplier = isMs ? 1 : 1000;

  const stringNumber = isMs ? time.slice(0, -2) : time.slice(0, -1);
  const number = parseFloat(stringNumber);

  return isNaN(number) ? 0 : multiplier * number;
};
