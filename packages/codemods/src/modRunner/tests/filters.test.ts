import { getModFilter, getRegexFilter, getStringFilter } from '../modFilter';
import { Maybe } from '../../maybe';

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
          return {};
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'bar',
        run: () => {
          return {};
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'foo',
        run: () => {
          return {};
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
          return {};
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'o zz o',
        run: () => {
          return {};
        },
      }),
    ).toBe(true);
    expect(
      modFilter({
        name: 'I wont be filtered!',
        run: () => {
          return {};
        },
      }),
    ).toBe(false);
  });
});
