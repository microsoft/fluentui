import { SRNC } from './SRNC-Definitions';

SRNC.readingOrder['Win/JAWS/VPC'] = {
  a: ['landmarksAndGroups', 'type', 'state', 'name'],
  'role=link': 'a',
  h1: ['landmarksAndGroups', 'type', 'content', 'state'],
  p: ['landmarksAndGroups', 'content', 'state'],
  span: ['landmarksAndGroups', 'content', 'state'],
  textarea: ['landmarksAndGroups', 'name', 'content', 'type', 'state'],
};
