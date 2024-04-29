export function register(SRNC: Record<string, any>) {
  SRNC.readingOrder['Win/JAWS'] = {
    '[default]': ['landmarksAndGroups', 'name', 'type', 'state', 'description', 'usage'],
    'input:text': ['landmarksAndGroups', 'name', 'type', 'state', 'content', 'description', 'usage'],
    'role=textbox': 'input:text',
    'input:search': 'input:text',
    'role=searchbox': 'input:text',
    'role=combobox': 'input:text',
    'input:radio': ['landmarksAndGroups', 'name', 'type', 'state', 'position', 'description', 'usage'],
    'role=radio': 'input:radio',
    a: ['landmarksAndGroups', 'name', 'state', 'type', 'description'],
    'role=link': 'a',
    'role=menuitem': 'input:radio',
    'role=menuitemcheckbox': 'input:radio',
    'role=menuitemradio': 'input:radio',
    select: 'input:text',
    'role=tab': 'input:radio',
    'role=option': 'input:radio',
    'role=treeitem': ['landmarksAndGroups', 'level', 'name', 'type', 'state', 'position', 'description', 'usage'],
    'role=gridcell': ['landmarksAndGroups', 'type', 'name', 'state', 'description'],
  };
}
