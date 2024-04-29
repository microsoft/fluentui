export function register(SRNC: Record<string, any>) {
  SRNC.usages['Win/JAWS'] = {
    button: {
      '[default]': 'To activate press Enter.',
      'aria-haspopup=true': '',
      'aria-haspopup=menu': '',
      'aria-haspopup=dialog': '',
      'aria-haspopup=grid': '',
      'aria-haspopup=listbox': '',
      'aria-haspopup=tree': '',
      'aria-pressed=true': 'To toggle the state press spacebar.',
      'aria-pressed=false': 'To toggle the state press spacebar.',
    }, // End button
    'role=button': {
      '[default]': 'To activate press Enter.',
      'aria-haspopup=true': 'Press space to activate the menu, then navigate with arrow keys',
      'aria-haspopup=menu': 'Press space to activate the menu, then navigate with arrow keys',
      'aria-haspopup=dialog': 'Press space to activate the menu, then navigate with arrow keys',
      'aria-haspopup=grid': 'Press space to activate the menu, then navigate with arrow keys',
      'aria-haspopup=listbox': 'Press space to activate the menu, then navigate with arrow keys',
      'aria-haspopup=tree': 'Press space to activate the menu, then navigate with arrow keys',
      'aria-pressed=true': 'To toggle the state press spacebar.',
      'aria-pressed=false': 'To toggle the state press spacebar.',
    }, // End role=button
    'input:text': {
      '[default]': 'Type in text.',
    }, // End input:text
    'role=textbox': 'input:text',
    'input:search': 'input:text',
    'role=searchbox': {
      '[default]': 'Type in text.',
    }, // End role=searchbox
    'input:checkbox': {
      '[default]': 'To check press Spacebar.',
      'checked=true': 'To clear checkmark press Spacebar.',
    }, // End input:checkbox
    'role=checkbox': {
      '[default]': 'To check press Spacebar.',
      'aria-checked=true': 'To clear checkmark press Spacebar.',
    }, // End role=checkbox
    'input:radio': {
      '[default]': 'To change the selection press Up or Down Arrow.',
    }, // End input:radio
    'role=radio': {
      '[default]': 'To change the selection press Up or Down Arrow.',
    }, // End role=radio
    'role=combobox': {
      '[default]': 'To set the value use the Arrow keys or type the value.',
    }, // End role=combobox
    textarea: {
      '[default]': 'Type in text.',
    }, // End textarea
    'role=menuitem': {
      '[default]': 'To move through items press up or down arrow.',
    }, // End role=menuitem
    'role=menuitemcheckbox': {
      '[default]': 'To move through items press up or down arrow.',
    }, // End role=menuitemcheckbox
    'role=menuitemradio': {
      '[default]': 'To move through items press up or down arrow.',
    }, // End role=menuitemradio
    select: {
      '[default]': 'To change the selection use the Arrow keys.',
    }, // End select
    'role=switch': {
      '[default]': '',
    }, // End role=switch
    'role=tab': {
      '[default]': 'To activate tab page press Spacebar.',
      'aria-selected=true': '',
    }, // End role=switch
    'role=option': {
      '[default]': 'To move to an item press the Arrow keys.',
    }, // End role=option
    'role=treeitem': {
      '[default]': 'To move through or expand items use the Arrow keys.',
    }, // End role=treeitem
  };
}
