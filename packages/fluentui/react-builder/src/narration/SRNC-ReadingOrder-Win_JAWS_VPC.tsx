import { SRNC } from './SRNC-Definitions';

SRNC.readingOrder['Win/JAWS/VPC'] = {
  a: ['landmarksAndGroups', 'type', 'state', 'name'],
  'role=link': 'a',
  p: ['landmarksAndGroups', 'content', 'state'],
  h1: ['landmarksAndGroups', 'type', 'content', 'state'],
  textarea: ['landmarksAndGroups', 'name', 'content', 'type', 'state'],
};
