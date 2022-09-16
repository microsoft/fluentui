export function register(SRNC: Record<string, any>) {
  SRNC.landmarksAndGroups['Win/JAWS/VPC'] = {
    // Section elements
    article: 'article',

    // Section roles
    'role=article': 'article',

    // Group and composite roles
    'role=radiogroup': 'group start',
    'role=tablist': 'group start',
  };
}
