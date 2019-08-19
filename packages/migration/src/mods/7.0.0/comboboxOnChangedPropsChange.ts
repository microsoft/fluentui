import ts from 'typescript';
import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { ModResult } from 'riceburn/lib/interfaces';
import { getWarningNote } from '../../util/getMessages';

const tagName = 'ComboBox';
const propName = 'onChanged';

export default migration(
  getWarningNote('ComboBox onChanged prop was removed'),
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
                // tslint:disable-next-line: max-line-length
              } - ${propName} is removed; please use onChange instead (NOTE: the arguments have changed from ${propName} to onChange; please update accordingly)`
            );
          }
        }
      }

      return undefined;
    }).files;
  }
);
