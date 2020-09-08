import { CalendarDayGrid } from './CalendarDayGrid';
import { isConformant } from '../../common/isConformant';

describe('CalendarDayGrid', () => {
  isConformant({
    Component: CalendarDayGrid,
    displayName: 'CalendarDayGrid',
    disabledTests: ['component-renders', 'exported-top-level', 'has-top-level-file'],
  });
});
