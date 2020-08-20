import { getModFilter, getRegexFilter, getStringFilter } from '../modFilter';
import { Maybe } from '../../helpers/maybe';
import { Ok } from '../../helpers/result';

describe('modRunner tests', () => {
  it('gets a basic exact name match filter from string', () => {
    const filter = getStringFilter('hi');
    expect(filter('hi')).toBe(true);
    expect(filter('h')).toBe(false);
  });

  it('gets a basic regex filter from a string', () => {
    const filter = getRegexFilter('.+hi');
    expect(filter('ohi')).toBe(true);
    expect(filter('booo')).toBe(false);
    expect(filter('hello hi there')).toBe(true);
  });

  it('always returns true if no filters provided', () => {
    const modFilter = getModFilter({ stringFilter: Maybe([]), regexFilter: Maybe(['']) });
    expect(
      modFilter({
        name: 'ohi',
        run: () => {
          return Ok({ logs: [] });
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'bar',
        run: () => {
          return Ok({ logs: [] });
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'foo',
        run: () => {
          return Ok({ logs: [] });
        },
      }),
    ).toBe(true);
  });

  it('gets a master filter based on a list of filters', () => {
    const modFilter = getModFilter({ stringFilter: Maybe(['hi']), regexFilter: Maybe(['.+zz']) });
    expect(
      modFilter({
        name: 'hi',
        run: () => {
          return Ok({ logs: [] });
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'o zz o',
        run: () => {
          return Ok({ logs: [] });
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'I wont be filtered!',
        run: () => {
          return Ok({ logs: [] });
        },
      }),
    ).toBe(false);
  });
});
