import { relativeDates } from './relativeDates';

describe('relativeDate', () => {
  it('returns the relatvie time between dates', () => {
    const then = new Date(2018, 5, 25);
    const now = new Date(2018, 6, 10);

    let response = relativeDates(then, now);

    expect(response).toEqual('15 days ago');
  });
});
