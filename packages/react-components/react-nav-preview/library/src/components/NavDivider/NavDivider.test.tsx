import { isConformant } from '../../testing/isConformant';
import { NavDivider } from './NavDivider';

describe('NavDivider', () => {
  isConformant({
    Component: NavDivider,
    displayName: 'NavDivider',
    testOptions: {
      'has-static-classnames': [
        {
          props: { children: 'Test Children' },
        },
      ],
    },
  });
});
