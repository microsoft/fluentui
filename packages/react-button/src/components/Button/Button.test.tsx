import * as path from 'path';
import { isConformant } from '@fluentui/react-conformance';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Button.tsx'),
    Component: Button,
    displayName: 'Button',
    disabledTests: ['has-docblock'],
  });
});
