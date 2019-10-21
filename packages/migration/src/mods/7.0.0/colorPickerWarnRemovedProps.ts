import ts from 'typescript';
import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { ModResult } from 'riceburn/lib/interfaces';
import { getWarningNote } from '../../util/getMessages';

const onChangedPropsByComponent: { [component: string]: string } = {
  ColorPicker: 'onColorChanged',
  ColorRectangle: 'onSVChanged',
  ColorSlider: 'onChanged'
};

export default migration(
  getWarningNote('ColorPicker onChanged prop was removed'),
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      let tagName: string;
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        (tagName = node.tagName.getFullText()) in onChangedPropsByComponent &&
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
            if (propName === onChangedPropsByComponent[tagName]) {
              opts.warn(
                `${prefix} - ${tagName} ${propName} is removed; please use onChange instead ` +
                  `(NOTE: DOM event is now passed as first argument)`
              );
            }
          }
        }
      }

      return undefined;
    }).files;
  }
);
