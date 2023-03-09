import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: [
      // compat components that are closer to their v8 counterparts do not adhere to this test
      'consistent-callback-args',
    ],
  });
});
