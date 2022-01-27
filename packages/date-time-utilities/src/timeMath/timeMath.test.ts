import * as TimeMath from './timeMath';

describe('timeMath', () => {
  it('can add minutes', () => {
    let startDate;
    let result;

    startDate = new Date(2015, 3, 31);
    result = TimeMath.addMinutes(startDate, 30);
    expect(result.getMinutes()).toBe(30);

    startDate = new Date(2021, 6, 14, 5, 9, 21);
    result = TimeMath.addMinutes(startDate, 30);
    expect(result.getMinutes()).toBe(39);

    startDate = new Date(2021, 6, 14, 5, 30, 21);
    result = TimeMath.addMinutes(startDate, 30);
    expect(result.getMinutes()).toBe(0);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, 35);
    expect(result.getMinutes()).toBe(21);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, 126);
    expect(result.getMinutes()).toBe(52);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, 0);
    expect(result.getMinutes()).toBe(46);

    startDate = new Date(2021, 6, 14, 5, 46, 21);
    result = TimeMath.addMinutes(startDate, -30);
    expect(result.getMinutes()).toBe(16);

    startDate = new Date(2021, 6, 14, 5, 24, 21);
    result = TimeMath.addMinutes(startDate, -48);
    expect(result.getMinutes()).toBe(36);

    startDate = new Date(2021, 6, 14, 5, 24, 21);
    result = TimeMath.addMinutes(startDate, -97);
    expect(result.getMinutes()).toBe(47);
  });

  it('can ceil minute', () => {
    const date = new Date();
    let result: Date;

    date.setMinutes(5);
    result = TimeMath.ceilMinuteToIncrement(date, 15);
    expect(result.getMinutes()).toBe(15);

    date.setMinutes(0);
    result = TimeMath.ceilMinuteToIncrement(date, 15);
    expect(result.getMinutes()).toBe(0);

    result = TimeMath.ceilMinuteToIncrement(date, 44);
    expect(result.getMinutes()).toBe(0);

    date.setMinutes(32);
    result = TimeMath.ceilMinuteToIncrement(date, 15);
    expect(result.getMinutes()).toBe(45);

    date.setMinutes(15);
    result = TimeMath.ceilMinuteToIncrement(date, 30);
    expect(result.getMinutes()).toBe(30);

    date.setMinutes(15);
    result = TimeMath.ceilMinuteToIncrement(date, 60);
    expect(result.getMinutes()).toBe(0);
  });

  it('can get date from time selection', () => {
    const baseDate = new Date('November 25, 2021 09:15:00');

    let result: Date;
    result = TimeMath.getDateFromTimeSelection(false, baseDate, '11:30');
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(25);
    expect(result.getHours()).toBe(11);
    expect(result.getMinutes()).toBe(30);

    result = TimeMath.getDateFromTimeSelection(true, baseDate, '12:00 am');
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(26);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);

    result = TimeMath.getDateFromTimeSelection(false, baseDate, '7:00:00');
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(26);
    expect(result.getHours()).toBe(7);
    expect(result.getMinutes()).toBe(0);

    result = TimeMath.getDateFromTimeSelection(true, baseDate, '4:20 PM');
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(25);
    expect(result.getHours()).toBe(16);
    expect(result.getMinutes()).toBe(20);

    result = TimeMath.getDateFromTimeSelection(false, baseDate, '9:15');
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(25);
    expect(result.getHours()).toBe(9);
    expect(result.getMinutes()).toBe(15);

    result = TimeMath.getDateFromTimeSelection(true, baseDate, '9:00 am');
    expect(result.getMonth()).toBe(10);
    expect(result.getDate()).toBe(26);
    expect(result.getHours()).toBe(9);
    expect(result.getMinutes()).toBe(0);
  });

  it('can get date from time selection over New Years', () => {
    const baseDate = new Date('December 31, 2021 08:00:00');

    let result: Date;
    result = TimeMath.getDateFromTimeSelection(false, baseDate, '00:00');
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);

    result = TimeMath.getDateFromTimeSelection(true, baseDate, '11:59 pm');
    expect(result.getMonth()).toBe(11);
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);

    result = TimeMath.getDateFromTimeSelection(false, baseDate, '07:59');
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(7);
    expect(result.getMinutes()).toBe(59);

    result = TimeMath.getDateFromTimeSelection(true, baseDate, '1:30 pm');
    expect(result.getMonth()).toBe(11);
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(13);
    expect(result.getMinutes()).toBe(30);
  });
});
