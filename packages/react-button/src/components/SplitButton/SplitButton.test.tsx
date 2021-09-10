import { isConformant } from '../../common/isConformant';
import { Button } from '../Button/index';
import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    disabledTests: ['as-renders-fc', 'as-renders-html'],
    displayName: 'SplitButton',
    targetComponent: Button,
  });
});
