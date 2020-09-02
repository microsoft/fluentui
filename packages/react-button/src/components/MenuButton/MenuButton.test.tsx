import { MenuButton } from './MenuButton';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

describe('ToggleButton', () => {
  isConformant({
    componentPath: path.join(__dirname, 'MenuButton.tsx'),
    Component: MenuButton,
    displayName: 'MenuButton',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });
});
