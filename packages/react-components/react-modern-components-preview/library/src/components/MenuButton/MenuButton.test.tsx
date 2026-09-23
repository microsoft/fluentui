import { isConformant } from '../../testing/isConformant';
import { MenuButton } from './MenuButton';

isConformant({
  Component: MenuButton,
  displayName: 'MenuButton',
  disableTypeTests: true,
  disabledTests: ['exported-top-level', 'has-top-level-file'],
  requiredProps: { children: 'Menu button' },
});
