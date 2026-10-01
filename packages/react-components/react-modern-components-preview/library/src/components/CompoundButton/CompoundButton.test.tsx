import { isConformant } from '../../testing/isConformant';
import { CompoundButton } from './CompoundButton';

isConformant({
  Component: CompoundButton,
  displayName: 'CompoundButton',
  disableTypeTests: true,
  disabledTests: ['exported-top-level', 'has-top-level-file'],
  requiredProps: { children: 'Compound button' },
});
