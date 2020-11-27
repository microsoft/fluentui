import { SRNC } from './SRNC-Definitions';

SRNC.readingOrder['Win/JAWS/VPC'] = {
  a: ['landmarksAndGroups', 'type', 'state', 'name'],
  'role=link': 'a',
  h1: ['landmarksAndGroups', 'type', 'content', 'state'],
  h2: 'h1',
  h3: 'h1',
  h4: 'h1',
  h5: 'h1',
  h6: 'h1',
  p: ['landmarksAndGroups', 'content', 'state'],
  span: 'p',
  textarea: ['landmarksAndGroups', 'name', 'content', 'type', 'state'],
};
