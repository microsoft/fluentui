import { SplitButton } from './SplitButton';
import { Button } from '../Button/Button';
import { isConformant } from '../../common/isConformant';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
    targetComponent: Button,
  });
});
