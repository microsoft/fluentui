import { stripIndents } from '@nx/devkit';
import path = require('path/posix');
import { getTemplate } from './utils';
describe(`utils`, () => {
  describe(`#getTemplate`, () => {
    const getFixturePath = (src: string) => {
      return path.join(__dirname, '__fixtures__', src);
    };

    it(`should return template contents`, () => {
      const expected = stripIndents`export function hello(){ return 'world'; };`;
      const actual = getTemplate(getFixturePath('utils-hello.ts__tmpl__'), {});

      expect(actual).toBe(expected);
    });

    it(`should return template contents and substitue variables`, () => {
      const expected = stripIndents`export function hello(){ return 'hello champion!'; };`;
      const actual = getTemplate(getFixturePath('utils-hello-substitute.ts__tmpl__'), { greeting: 'champion!' });

      expect(actual).toBe(expected);
    });
  });
});
