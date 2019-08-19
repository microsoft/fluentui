import ts from 'typescript';
import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { ModResult } from 'riceburn/lib/interfaces';
import { getWarningNote } from '../../util/getMessages';

const tagName = 'TextField';
const onChanged = 'onChanged';
const onBeforeChange = 'onBeforeChange';
const iconClass = 'iconClass';

export default migration(
  getWarningNote('TextField onChanged, onBeforeChange, and iconClass props were removed'),
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
          if (ts.isJsxAttribute(prop) && prop && prop.name && prop.initializer) {
            const prefix = `${sourceFileName}:${lineAndCharacter.line}:${lineAndCharacter.character}`;
            const propName = prop.name.getText();
            if (propName === onChanged) {
              opts.warn(
                `${prefix} - ${onChanged} is removed; please use onChange instead (NOTE: DOM event is now passed as first argument).`
              );
            } else if (propName === onBeforeChange) {
              opts.warn(`${prefix} = ${onBeforeChange} is removed; please use onChange instead.`);
            } else if (propName === iconClass) {
              opts.warn(`${prefix} - ${iconClass} is removed; please use iconProps instead.`);
            }
          }
        }
      }

      return undefined;
    }).files;
  }
);
