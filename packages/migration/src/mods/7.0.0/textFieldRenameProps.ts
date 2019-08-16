import { migration, IMigrationOptions } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';
import { ModResult } from 'riceburn/lib/interfaces';

export default migration(
  'TextField: rename deprecated props',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return (
        renameJsxProp('TextField', 'addonString', 'prefix')(node, modder) ||
        renameJsxProp('TextField', 'onRenderAddon', 'onRenderPrefix')(node, modder) ||
        renameJsxProp('TextField', 'componentId', 'id')(node, modder)
      );
    }).files;
  }
);
