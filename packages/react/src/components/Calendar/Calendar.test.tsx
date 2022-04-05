import { Calendar } from './Calendar';
import { isConformant } from '../../common/isConformant';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
  });
});
