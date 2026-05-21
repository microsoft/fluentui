import { InfoButton } from './InfoButton';
import { isConformant } from '../../../testing/isConformant';

describe('InfoButton', () => {
  isConformant({
    Component: InfoButton,
    displayName: 'InfoButton',
    requiredProps: {
      info: "This is an InfoButton's information.",
    },
    disabledTests: ['component-has-static-classnames-object', 'exported-top-level', 'has-top-level-file-extra'],
  });
});
