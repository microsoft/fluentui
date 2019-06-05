import { IMigrationOptions, migration, ModResult } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';

export default migration(
  'rename deprecated Button props from text to content',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.tsx', opts).asTypescript((node, modder) => {
      return renameJsxProp('Button', 'text', 'content')(node, modder);
    }).files;
  }
);
