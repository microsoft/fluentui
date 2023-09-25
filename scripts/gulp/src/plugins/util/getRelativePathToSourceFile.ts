import path from 'path';
import config from '../../config';

const examplesPath = config.paths.docsSrc('examples', 'components');

/**
 * Generates a relative path to a source file, outputs:
 * Chat/Types/ChatExample.shorthand.source.json
 */
const getRelativePathToSourceFile = (filePath: string): string =>
  `${path.relative(examplesPath, filePath).replace(/\.tsx$/, '')}.source.json`;

export default getRelativePathToSourceFile;
