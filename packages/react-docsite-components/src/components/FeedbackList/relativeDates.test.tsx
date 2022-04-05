import { relativeDates } from './relativeDates';

describe('relativeDate', () => {
  it('returns the relative time between dates', () => {
    const then = new Date(2018, 5, 25, 10, 0);
    const now = new Date(2018, 5, 25, 10, 30);

    const response = relativeDates(then, now);

    expect(response).toEqual('1 hour ago');
  });

  it('returns the relative time between dates', () => {
    const then = new Date(2018, 5, 25, 10, 0);
    const now = new Date(2018, 5, 25, 11, 30);

    const response = relativeDates(then, now);

    expect(response).toEqual('1 hour ago');
  });

  it('returns the relative time between dates', () => {
    const then = new Date(2018, 5, 25, 6, 0);
    const now = new Date(2018, 5, 25, 10, 30);

    const response = relativeDates(then, now);

    expect(response).toEqual('4 hours ago');
  });

  it('returns the relative time between dates', () => {
    const then = new Date(2018, 5, 25);
    const now = new Date(2018, 5, 26);

    const response = relativeDates(then, now);

    expect(response).toEqual('1 day ago');
  });

  it('returns the relative time between dates', () => {
    const then = new Date(2018, 5, 25);
    const now = new Date(2018, 5, 26, 10);

    const response = relativeDates(then, now);

    expect(response).toEqual('1 day ago');
  });

  it('returns the relative time between dates', () => {
    const then = new Date(2018, 5, 25);
    const now = new Date(2018, 6, 10);

    const response = relativeDates(then, now);

    expect(response).toEqual('15 days ago');
  });

  it('returns the relative time between dates', () => {
    const then = new Date(2018, 6, 25);
    const now = new Date(2018, 8, 29);

    const response = relativeDates(then, now);

    expect(response).toEqual('on Jul 25');
  });
});
