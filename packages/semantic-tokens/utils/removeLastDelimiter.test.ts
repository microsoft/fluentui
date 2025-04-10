import path = require('node:path');
import { removeLastDelimiter } from './removeLastDelimiter';
describe('removeLastDelimiter', () => {
  it('Removing the last delimiter works with file path', () => {
    const testDirPath = path.join(__dirname, '../test/test2/test3');
    const testFilePath = path.join(testDirPath, 'testFile.ts');

    // We use path.sep as it is platform dependent
    expect(removeLastDelimiter(testFilePath, path.sep)).toMatch(testDirPath);
  });
});
