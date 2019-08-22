import { IMigrationOptions, migration } from '../../migration';
import { mod } from 'riceburn';
import { moveImports } from '../../util/MoveImports';
import { ModResult } from 'riceburn/lib/interfaces';
import { getModificationNote } from '../../util/getMessages';

const legacyExports = ['createRef'];
const fromPackage = 'office-ui-fabric-react';
const toPackage = 'react';

export default migration(
  getModificationNote('createRef import should come from React.createRef, not from office-ui-fabric-react'),
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.ts?(x)', opts).asTypescript((node, modder) => {
      return moveImports(node, modder, fromPackage, toPackage, legacyExports);
    }).files;
  }
);
