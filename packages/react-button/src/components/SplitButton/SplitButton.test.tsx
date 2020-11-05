import { SplitButton } from './SplitButton';
import { Button } from '../Button/index';
import { isConformant } from '../../common/isConformant';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
    targetComponent: Button,
  });
});
