import ts from 'typescript';
import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';

const tagName = 'SearchBox';
const propName = 'onChange';

export default migration(
  'warn SearchBox.onChange args changed',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        node.tagName.getFullText() === tagName &&
        node.attributes &&
        node.attributes.properties
      ) {
        const sourceFile = node.getSourceFile();
        const sourceFileName = sourceFile.fileName;
        const lineAndCharacter = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        for (const prop of node.attributes.properties) {
          if (ts.isJsxAttribute(prop) && prop && prop.name && prop.name.getText() === propName && prop.initializer) {
            opts.warn(
              `${sourceFileName}:${lineAndCharacter.line}:${
                lineAndCharacter.character
              } - ${propName} signature has changed; DOM event is now passed as first argument.`
            );
          }
        }
      }

      return undefined;
    }).files;
  }
);
