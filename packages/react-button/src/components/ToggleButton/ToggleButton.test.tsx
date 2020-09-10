import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  isConformant({
    componentPath: path.join(__dirname, 'ToggleButton.tsx'),
    Component: ToggleButton,
    displayName: 'ToggleButton',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });
});
