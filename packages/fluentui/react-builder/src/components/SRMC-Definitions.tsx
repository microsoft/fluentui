const SRMC: { [key: string]: any } = {
  PART_SEPARATOR: ' ',
  STATE_PART_SEPARATOR: ' ',

  // Element type strings for each platform
  typeStrings: {
    'Win/JAWS': {
      toggleButton: 'Toggle button',
      textInput: 'Edit',
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
    }, // End Win/JAWS
  }, // End typeStrings

  // Element state strings for each platform and definition name
  stateStrings: {
    'Win/JAWS': {
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
        'aria-required=true': 'Required',
      }, // End input:checkbox
      'role=checkbox': {
        'aria-checked=true': 'checked',
        'aria-checked=false': 'not checked',
        'aria-checked=mixed': 'partially checked',
        'aria-required=true': 'Required',
      }, // End role=checkbox
      'input:radio': {
        'checked=true': 'checked',
        'checked=false': 'not checked',
        'aria-required=true': 'Required',
      }, // End input:radio
      'role=radio': {
        'aria-checked=true': 'checked',
        'aria-checked=false': 'not checked',
        'aria-required=true': 'Required',
      }, // End role=radio
      'role=combobox': {
        'aria-invalid=true': 'invalid entry',
        'aria-required=true': 'Required',
      }, // End role=combobox
      textarea: {
        'aria-invalid=true': 'invalid entry',
        'aria-required=true': 'Required',
        '[extra1]': 'Contains text',
      }, // End textarea
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
      'role=menuitemradio': {
        'aria-checked=true': 'checked',
        'aria-checked=false': 'not checked',
      }, // End role=menuitemradio
      select: {
        'aria-invalid=true': 'invalid entry',
        'aria-required=true': 'Required',
      }, // End select
      'role=switch': {
        'aria-checked=true': 'Pressed On',
        'aria-checked=false': 'Off',
      }, // End role=switch
      'role=tab': {
        'aria-selected=true': 'Selected',
        'aria-selected=false': '',
      }, // End role=tab
      'role=option': {}, // End role=option
    }, // End Win/JAWS
  }, // End stateStrings

  // Element usage strings for each platform and definition name
  usageStrings: {
    'Win/JAWS': {
      button: {
        '[default]': 'To activate press Enter.',
        'aria-pressed=true': 'To toggle the state press spacebar.',
        'aria-pressed=false': 'To toggle the state press spacebar.',
      }, // End button
      'input:text': {
        '[default]': 'Type in text.',
      }, // End input:text
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
    }, // End Win/JAWS
  }, // End usageStrings

  // State attributes of which "false" value means the attribute is omitted
  falseMeansOmitted: ['aria-haspopup', 'aria-invalid', 'aria-required'], // End falseMeansOmitted

  // Rules for the message type and state computation based on the element state attributes combination (the definitions for each platform are stored in a separate file)
  stateRules: {
    'Win/JAWS': {},
  }, // End stateRules

  // Computed message parts reading order for each platform and definition name
  readingOrder: {
    'Win/JAWS': {
      '[default]': ['name', 'type', 'state', 'description', 'usage'],
      'input:text': ['name', 'type', 'state', 'value', 'description', 'usage'],
      'role=combobox': 'input:text',
      textarea: 'input:text',
      a: ['name', 'state', 'type', 'description', 'usage'],
      'role=menuitem': ['name', 'type', 'state', 'position', 'description', 'usage'],
      'role=menuitemcheckbox': 'role=menuitem',
      'role=menuitemradio': 'role=menuitem',
      select: 'input:text',
      'role=tab': 'role=menuitem',
      'role=option': 'role=menuitem',
    }, // End Win/JAWS
  }, // End readingOrder

  // Possible state attributes for each definition name
  possibleStates: {
    button: ['aria-expanded', 'aria-haspopup', 'aria-pressed'],
    'input:text': ['aria-invalid', 'aria-required'],
    'input:checkbox': ['checked', 'aria-required'],
    'role=checkbox': ['aria-checked', 'aria-required'],
    'input:radio': ['checked', 'aria-required'],
    'role=radio': ['aria-checked', 'aria-required'],
    'role=combobox': ['aria-invalid', 'aria-required'],
    textarea: ['aria-invalid', 'aria-required'],
    a: ['aria-expanded', 'aria-haspopup', 'aria-pressed'],
    'role=menuitem': ['aria-haspopup'],
    'role=menuitemcheckbox': ['aria-checked'],
    'role=menuitemradio': ['aria-checked'],
    select: ['aria-invalid', 'aria-required'],
    'role=switch': ['aria-checked'],
    'role=option': [],
    'role=tab': ['aria-selected'],
  }, // End possibleStates
};

export default SRMC;
