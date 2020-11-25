import { SRNC } from './SRNC-Definitions';

SRNC.readingOrder['Win/JAWS/VPC'] = {
  a: ['landmarksAndGroups', 'type', 'state', 'name'],
  'role=link': 'a',
  p: ['landmarksAndGroups', 'content'],
  textarea: ['landmarksAndGroups', 'name', 'content', 'type', 'state'],
};
