export function register(SRNC: Record<string, any>) {
  SRNC.elementTypes['Win/JAWS/VPC'] = {
    h1: 'heading level 1',
    h2: 'heading level 2',
    h3: 'heading level 3',
    h4: 'heading level 4',
    h5: 'heading level 5',
    h6: 'heading level 6',
    listbox: 'List box',
    tree: 'Tree view',
    menuitem: 'menu',
    menuitemcheckbox: 'menu',
    menuitemradio: 'menu',
  };
}
