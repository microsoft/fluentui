import { toCamelCase } from './toCamelCase';

describe('toCamelCase', () => {
  it('Splits and camel cases strings separated by forward slash', () => {
    // We use path.sep as it is platform dependent
    expect(toCamelCase('test1/test2/test3')).toMatch('test1Test2Test3');
  });
});
