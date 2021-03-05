import * as _ from 'lodash';
import * as moment from 'moment';
import { date } from 'faker';

const getNowDate = (): Date => new Date();

const areMomentsSameDay = (m: moment.Moment, d: Date = getNowDate()) => m.isSame(d, 'day');

export const getRandomDates = (count, daysAgo: number): Date[] => {
  const now = getNowDate();
  const midnight = new Date(now);
  midnight.setHours(0);

  const yesterdayMidnight = new Date(midnight);
  yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 1);

  return [
    date.between(now, midnight),
    date.between(midnight, yesterdayMidnight),
    date.between(midnight, yesterdayMidnight),
    ..._.times(count - 3).map(() => date.recent(daysAgo)),
  ].slice(0, count);
};

export const getTimestamp = (inputDate: Date): { short: string; long: string } => {
  const dateMoment = moment(inputDate);
  const timeString = dateMoment.format('LT');

  return {
    short: `${areMomentsSameDay(dateMoment) ? '' : `${dateMoment.format('M/D')} `}${timeString}`,
    long: `${dateMoment.format('ll')} ${timeString}`,
  };
};

export const getFriendlyDateString = (inputDate: Date): string => {
  const momentNow = moment();
  if (areMomentsSameDay(momentNow, inputDate)) {
    return 'Today';
  }

  if (areMomentsSameDay(momentNow.subtract(1, 'd'), inputDate)) {
    return 'Yesterday';
  }

  return moment(inputDate).format('LL');
};

export const areSameDay = (d1: Date, d2: Date): boolean => areMomentsSameDay(moment(d1), d2);
