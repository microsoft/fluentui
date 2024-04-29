export function register(SRNC: Record<string, any>) {
  SRNC.elementTypes['Win/JAWS'] = {
    toggleButton: 'Toggle button',
    textInput: 'Edit',
    searchInput: 'Search edit',
    button: 'Button',
    checkboxInput: 'check box',
    radioInput: 'radio button',
    combobox: 'edit combo',
    textarea: 'Edit',
    link: 'Link',
    menuitem: '',
    menuitemcheckbox: '',
    menuitemradio: '',
    select: 'Combo box',
    switch: 'Switch',
    tab: 'Tab',
    option: '',
    treeitem: '',
    gridcell: 'column X row Y',
  };
}
