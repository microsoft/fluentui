import { uniqueArray } from './utils';

describe(`utils`, () => {
  it(`should create uniquie array`, () => {
    expect(uniqueArray(['a', 'b', 'a', 'c', 'd', 'b'])).toEqual(['a', 'b', 'c', 'd']);
  });
});
