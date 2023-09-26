import { isConformant } from '../../testing/isConformant';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  isConformant({
    Component: TimePicker,
    displayName: 'TimePicker',
  });
});
