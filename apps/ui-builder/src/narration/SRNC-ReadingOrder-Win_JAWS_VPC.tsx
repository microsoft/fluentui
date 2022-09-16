export function register(SRNC: Record<string, any>) {
  SRNC.readingOrder['Win/JAWS/VPC'] = {
    a: ['landmarksAndGroups', 'type', 'state', 'name'],
    'role=link': 'a',
    h1: ['landmarksAndGroups', 'type', 'content', 'state'],
    h2: 'h1',
    h3: 'h1',
    h4: 'h1',
    h5: 'h1',
    h6: 'h1',
    span: ['landmarksAndGroups', 'content', 'state'],
    'role=listitem': 'span',
    textarea: ['landmarksAndGroups', 'name', 'content', 'type', 'state'],
    'role=menuitemcheckbox': 'a',
    'role=menuitemradio': 'a',
  };
}
