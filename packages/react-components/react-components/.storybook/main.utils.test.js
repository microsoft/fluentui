/// <reference types="jest" />
const utils = require('./main.utils');

describe(`main utils`, () => {
  describe(`#getVnextStories`, () => {
    it(`should generate storybook stories string array of glob based on package.json#dependencies field`, () => {
      const actual = utils.getVnextStories();
      const expected = [
        expect.stringContaining('../../react-'),
        expect.stringContaining('/src/**/@(index.stories.@(ts|tsx)|*.stories.mdx)'),
      ];

      expect(actual).toEqual(expect.arrayContaining(expected));

      const first = actual[0];
      expect(first.startsWith('../../react-')).toBeTruthy();
      expect(first.endsWith('/src/**/@(index.stories.@(ts|tsx)|*.stories.mdx)')).toBeTruthy();
    });
  });
});
