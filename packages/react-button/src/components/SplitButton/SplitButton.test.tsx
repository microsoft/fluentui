import { SplitButton } from './SplitButton';
import { Button } from '../Button/index';
import { isConformant } from '../../common/isConformant';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    disabledTests: ['as-renders-fc', 'as-renders-html'],
    displayName: 'SplitButton',
    targetComponent: Button,
  });
});
