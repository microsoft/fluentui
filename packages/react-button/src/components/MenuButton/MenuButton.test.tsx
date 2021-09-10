import { isConformant } from '../../common/isConformant';
import { MenuButton } from './MenuButton';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton,
    displayName: 'MenuButton',
  });
});
