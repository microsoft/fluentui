import { stripIndents } from '@nx/devkit';
import { getCjsConfigObjectAst, getASTconfigObjectProp } from './utils';

describe(`utils`, () => {
  describe(`AST`, () => {
    it(`should get config object AST`, () => {
      const ast = getCjsConfigObjectAst(stripIndents`
       module.exports = {
         extends: '@org/my-config',
         root: true,
         plugins: ['some-plugin']
       }
      `);

      expect(ast).toBeDefined();

      expect(() => {
        getCjsConfigObjectAst(stripIndents`
       const config = {
         extends: '@org/my-config',
         root: true,
         plugins: ['some-plugin']
       }
      `);
      }).toThrow();
    });

    it(`should return defined prop initializer as string`, () => {
      const ast = getCjsConfigObjectAst(stripIndents`
       module.exports = {
         extends: '@org/my-config',
         root: true,
         plugins: ['some-plugin']
       }
      `);

      const actual = getASTconfigObjectProp(ast, 'plugins');
      const expected = `['some-plugin']`;

      expect(actual).toBe(expected);
    });
  });
});
