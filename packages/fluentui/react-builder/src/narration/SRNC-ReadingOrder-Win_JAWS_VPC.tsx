import { SRNC } from './SRNC-Definitions';

SRNC.readingOrder['Win/JAWS/VPC'] = {
  a: ['landmarksAndGroups', 'type', 'state', 'name'],
  'role=link': 'a',
  p: ['landmarksAndGroups', 'content'],
  textarea: ['name', 'content', 'state', 'type'],
};
