import { isConformant } from '../../testing/isConformant';
import { SplitButton } from './SplitButton';

isConformant({
  Component: SplitButton,
  displayName: 'SplitButton',
  disableTypeTests: true,
  disabledTests: ['exported-top-level', 'has-top-level-file'],
  requiredProps: { children: 'Split button' },
});
