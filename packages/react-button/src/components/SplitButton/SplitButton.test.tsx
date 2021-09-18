import { isConformant } from '../../common/isConformant';
import { Button } from '../Button/index';
import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
  });
});
