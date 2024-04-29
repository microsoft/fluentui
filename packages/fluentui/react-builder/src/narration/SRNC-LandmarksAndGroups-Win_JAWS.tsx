export function register(SRNC: Record<string, any>) {
  SRNC.landmarksAndGroups['Win/JAWS'] = {
    // Landmark elements
    aside: 'Complementary Region',
    footer: 'Content Info Region',
    header: 'Banner Region',
    main: 'Main Region',
    nav: 'Navigation Region',

    // Landmark roles
    'role=banner': 'Banner Region',
    'role=complementary': 'Complementary Region',
    'role=contentinfo': 'Content Info Region',
    'role=form': 'Form Region',
    'role=main': 'Main Region',
    'role=navigation': 'Navigation Region',
    'role=region': 'Region',
    'role=search': 'Search Region',

    // Section elements
    article: 'Article Region',
    ol: 'list of X items',
    ul: 'list of X items',

    // Section roles
    'role=article': 'Article Region',
    'role=list': 'list of X items',

    // Group and composite roles
    'role=grid': 'Grid',
    'role=listbox': 'List box',
    'role=menu': 'menu',
    'role=menubar': 'menu',
    'role=radiogroup': 'group',
    'role=tablist': 'Tab',
    'role=toolbar': 'Tool bar',
    'role=tree': 'Tree view',
    'role=treegrid': 'TreeGrid',

    // Other elements and roles
    dialog: 'dialog',
    'role=dialog': 'dialog',
    'role=alertdialog': 'dialog',
  };
}
