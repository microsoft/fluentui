import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: [
      // v8 doesn't follow this rule
      'consistent-callback-args',
    ],
  });
});
