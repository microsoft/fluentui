export function register(SRNC: Record<string, any>) {
  SRNC.elementStates['Win/JAWS'] = {
    button: {
      'aria-expanded=true': 'expanded',
      'aria-expanded=false': 'collapsed',
      'aria-haspopup=true': 'menu',
      'aria-haspopup=menu': 'menu',
      'aria-haspopup=listbox': 'menu',
      'aria-haspopup=tree': 'menu',
      'aria-haspopup=grid': 'menu',
      'aria-haspopup=dialog': 'menu',
      'aria-haspopup=': '',
      'aria-pressed=true': 'Pressed',
      'aria-pressed=false': '',
    }, // End button
    'input:text': {
      'aria-invalid=true': 'invalid entry',
      'aria-required=true': 'Required',
    }, // End input:text
    'input:checkbox': {
      'checked=true': 'checked',
      'checked=false': 'not checked',
      'aria-invalid=true': 'invalid entry',
      'aria-required=true': 'Required',
    }, // End input:checkbox
    'role=checkbox': {
      'aria-checked=true': 'checked',
      'aria-checked=false': 'not checked',
      'aria-checked=mixed': 'partially checked',
      'aria-invalid=true': 'invalid entry',
      'aria-required=true': 'Required',
    }, // End role=checkbox
    'input:radio': {
      'checked=true': 'checked',
      'checked=false': 'not checked',
      'aria-invalid=true': 'invalid entry',
      'aria-required=true': 'Required',
    }, // End input:radio
    'role=radio': {
      'aria-checked=true': 'checked',
      'aria-checked=false': 'not checked',
      'aria-invalid=true': 'invalid entry',
      'aria-required=true': 'Required',
    }, // End role=radio
    'role=combobox': 'input:text',
    textarea: 'input:text',
    a: {
      'aria-expanded=true': 'expanded',
      'aria-expanded=false': 'collapsed',
      'aria-haspopup=true': 'Has Popup menu',
      'aria-haspopup=menu': 'Has Popup menu',
      'aria-haspopup=listbox': 'Has Popup listbox',
      'aria-haspopup=tree': 'Has Popup tree',
      'aria-haspopup=grid': 'Has Popup grid',
      'aria-haspopup=dialog': 'Has Popup dialog',
      'aria-haspopup=': '',
    }, // End a
    'role=menuitem': {
      'aria-haspopup=true': 'submenu',
      'aria-haspopup=menu': 'submenu',
      'aria-haspopup=listbox': 'submenu',
      'aria-haspopup=tree': 'submenu',
      'aria-haspopup=grid': 'submenu',
      'aria-haspopup=dialog': 'submenu',
      'aria-haspopup=': '',
    }, // End role=menuitem
    'role=menuitemcheckbox': {
      'aria-checked=true': 'checked',
      'aria-checked=false': 'not checked',
    }, // End role=menuitemcheckbox
    'role=menuitemradio': 'role=menuitemcheckbox',
    select: 'input:text',
    'role=switch': {
      'aria-checked=true': 'Pressed On',
      'aria-checked=false': 'Off',
    }, // End role=switch
    'role=tab': {
      'aria-selected=true': 'Selected',
      'aria-selected=false': '',
    }, // End role=tab
    'role=option': {},
    'role=treeitem': {
      'aria-expanded=true': 'open',
      'aria-expanded=false': 'closed',
    }, // End role=treeitem
    'role=gridcell': {
      'aria-selected=true': 'selected',
      'aria-selected=false': '',
      'aria-haspopup=true': 'Has Popup',
      'aria-haspopup=menu': 'Has Popup',
      'aria-haspopup=listbox': 'Has Popup',
      'aria-haspopup=tree': 'Has Popup',
      'aria-haspopup=grid': 'Has Popup',
      'aria-haspopup=dialog': 'Has Popup',
      'aria-haspopup=': '',
    }, // End role=gridcell
  };
}
