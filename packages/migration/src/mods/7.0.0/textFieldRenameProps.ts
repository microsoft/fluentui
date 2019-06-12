import { migration } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';

export default migration('TextField: rename deprecated props', () => {
  return mod('**/*.tsx').asTypescript((node, modder) => {
    return (
      renameJsxProp('TextField', 'addonString', 'prefix')(node, modder) ||
      renameJsxProp('TextField', 'onRenderAddon', 'onRenderPrefix')(node, modder) ||
      renameJsxProp('TextField', 'componentId', 'id')(node, modder)
    );
  }).files;
});
