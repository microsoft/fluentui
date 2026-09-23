import { isConformant } from '../../testing/isConformant';
import { Button } from './Button';

describe('Button', () => {
  isConformant({
    Component: Button,
    displayName: 'Button',
    requiredProps: { children: 'Button' },
  });
});
