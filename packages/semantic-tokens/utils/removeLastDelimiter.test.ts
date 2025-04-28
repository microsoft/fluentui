import { removeLastDelimiter } from './removeLastDelimiter';

describe('removeLastDelimiter', () => {
  it('Removing the last delimiter works with file path', () => {
    const testDirPath = '/test/test2/test3';
    const testFilePath = '/test/test2/test3' + '/testFile.ts';

    // We use path.sep as it is platform dependent
    expect(removeLastDelimiter(testFilePath, '/')).toMatch(testDirPath);
  });
  it('Works with dashes for CSSVars', () => {
    expect(removeLastDelimiter('--smtc-shadow-card-rest-key-x', '-')).toMatch('--smtc-shadow-card-rest-key');
  });
});
