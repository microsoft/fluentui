import { isConformant } from '../../testing/isConformant';
import { ToggleButton } from './ToggleButton';

isConformant({
  Component: ToggleButton,
  displayName: 'ToggleButton',
  disableTypeTests: true,
  disabledTests: ['exported-top-level', 'has-top-level-file'],
  requiredProps: { children: 'Toggle button' },
});
