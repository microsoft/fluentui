import ts from 'typescript';
import { migration, IMigrationOptions } from '../../migration';
import { mod } from 'riceburn';
import { ModResult, TypescriptMod } from 'riceburn/lib/interfaces';
import { getModificationNote } from '../../util/getMessages';

const tagName = 'TextField';
const propReplacementMap: { [key: string]: string } = {
  addonString: 'prefix',
  onRenderAddon: 'onRenderPrefix',
  componentId: 'id'
};

export default migration(
  getModificationNote(
    'TextField deprecated props addonString, onRenderAddon and componentId were renamed to prefix, onRenderPrefix and id respectively'
  ),
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        node.tagName.getFullText() === tagName &&
        node.attributes &&
        node.attributes.properties
      ) {
        const mods: TypescriptMod[] = [];

        for (const prop of node.attributes.properties) {
          if (ts.isJsxAttribute(prop) && prop && prop.name && prop.initializer) {
            const propName = prop.name.getText();

            if (propReplacementMap[propName]) {
              mods.push(modder.replace(prop.name, propReplacementMap[propName]));
            }
          }
        }

        return mods;
      }

      return undefined;
    }).files;
  }
);
