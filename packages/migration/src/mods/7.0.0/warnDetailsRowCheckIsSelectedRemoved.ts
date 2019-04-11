import { migration } from '../../migration';
import { mod } from 'riceburn';
import { renameJsxProp } from 'riceburn/lib/mods/renameJsxProp';

export default migration('deprecated DetailsRowCheck.isSelected has been removed. Use DetailsRowCheck.selected instead.', () => {
  mod('**/*.ts?(x)').asTypescript((node, modder) => {
    return renameJsxProp('DetailsRowCheck', 'isSelected', 'selected')(node, modder);
  });
});
