import ts from 'typescript';
import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { ModResult } from 'riceburn/lib/interfaces';
import { getWarningNote } from '../../util/getMessages';

const typeName = 'ValuePosition';

export default migration(
  getWarningNote(`Slider ${typeName} enum is removed because no longer in use within the component`),
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.ts?(x)', opts).asTypescript((node, modder) => {
      if (ts.isTypeNode(node) && node.getFullText().indexOf(typeName) >= 0) {
        const sourceFile = node.getSourceFile();
        const sourceFileName = sourceFile.fileName;
        const lineAndCharacter = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        opts.warn(`${sourceFileName}:${lineAndCharacter.line}:${lineAndCharacter.character} - ${typeName} no longer available`);
      }
      return undefined;
    }).files;
  }
);
