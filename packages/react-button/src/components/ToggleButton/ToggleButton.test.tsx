import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
import { ToggleButton } from './ToggleButton';

describe('ToggleButton', () => {
  isConformant({
    componentPath: path.join(__dirname, 'ToggleButton.tsx'),
    Component: ToggleButton,
    displayName: 'ToggleButton',
    exportedAtTopLevel: true,
    disabledTests: ['has-docblock'],
  });
});
