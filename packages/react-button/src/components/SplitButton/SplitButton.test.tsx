import { SplitButton } from './SplitButton';
import { isConformant } from '../../common/isConformant';

describe('SplitButton', () => {
  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });
});
