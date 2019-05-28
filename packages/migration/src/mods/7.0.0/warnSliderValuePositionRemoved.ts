import ts from 'typescript';
import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';

const typeName = 'ValuePosition';

export default migration(
  'warn Slider.ValuePosition removed',
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
