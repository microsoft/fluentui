import { SplitButton } from './SplitButton';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

describe('ToggleButton', () => {
  isConformant({
    componentPath: path.join(__dirname, 'SplitButton.tsx'),
    Component: SplitButton,
    displayName: 'SplitButton',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });
});
