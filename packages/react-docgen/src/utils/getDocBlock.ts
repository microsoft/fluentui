import * as fs from 'fs';
import { DocBlock } from '../types';
import { parseDocBlock } from './parseDocBlock';

/** Get top-level doc comments: group 1 is the comment and group 2 is the next line. */
function* commentsIterator(contents: string): IterableIterator<RegExpExecArray> {
  const commentRegex = /^(\/\*\*[\s\S]+?^ \*\/)\r?\n(.*$)/gm;
  let match: RegExpExecArray | null;
  while ((match = commentRegex.exec(contents))) {
    yield match;
  }
}

/**
 * Lightweight method to get a file's main doc comment using regex, used in conformance tests.
 * This is less precise but faster than the method in docgen.ts which (indirectly) uses a TS program.
 */
export function getDocBlock(absPath: string): DocBlock {
  const contents = fs.readFileSync(absPath, 'utf8');

  // Get all the comments and search for preferred comment types (doing this instead of looking for
  // specific comment types prevents issues in files with multiple doc comments, where the regex
  // would take a the whole portion of the file from the first comment until the default export)
  const comments = Array.from(commentsIterator(contents));

  let comment = '';

  // Prefer the comment attached to the default export
  const defaultExportComment: RegExpExecArray | undefined = comments.find(comm => comm[2].startsWith('export default'));
  if (defaultExportComment) {
    comment = defaultExportComment[1];
  } else {
    // Top-level doc comments attached to a class or const
    const classConstComments = comments.filter(comm => /^(export )?(class|const)/.test(comm[2]));
    if (!classConstComments) {
      console.warn(`Couldn't find any doc comments attached to a top-level class or const`);
    } else {
      if (classConstComments.length > 1) {
        console.warn(
          `Found multiple top-level doc comments attached to a class or const: ${classConstComments.join('\n\n')}`,
        );
      }
      comment = classConstComments[0][1];
    }
  }

  return parseDocBlock(comment);
}
