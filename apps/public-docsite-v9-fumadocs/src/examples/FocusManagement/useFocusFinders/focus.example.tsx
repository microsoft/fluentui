import { createGuideExample } from '../../../components/GuideExample';
import description from './useFocusFindersDescription.md';
import { Default } from './Default.example';
import { FindFirst } from './FindFirst.example';
import { FindLast } from './FindLast.example';
import { FindAllWhere } from './FindAllWhere.example';
import { FindNext } from './FindNext.example';
import { FindPrevious } from './FindPrevious.example';

export { description };
export const examples = [
  { name: 'Default', Preview: createGuideExample(Default, 'Focus finders') },
  { name: 'FindFirst', Preview: createGuideExample(FindFirst, 'Find first') },
  { name: 'FindLast', Preview: createGuideExample(FindLast, 'Find last') },
  { name: 'FindAllWhere', Preview: createGuideExample(FindAllWhere, 'Find all matching elements') },
  { name: 'FindNext', Preview: createGuideExample(FindNext, 'Find next') },
  { name: 'FindPrevious', Preview: createGuideExample(FindPrevious, 'Find previous') },
];
