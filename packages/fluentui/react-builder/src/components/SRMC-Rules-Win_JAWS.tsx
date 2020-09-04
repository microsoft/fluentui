import SRMC from './SRMC-Definitions';

SRMC.stateRules['Win/JAWS'] = {
  button: [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-expanded'],
      elementType: SRMC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-pressed'],
      elementType: SRMC.typeStrings['Win/JAWS'].toggleButton,
    },
    {
      combination: ['aria-expanded', 'aria-haspopup'],
      order: ['aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-expanded', 'aria-pressed'],
      order: ['aria-pressed'],
      elementType: SRMC.typeStrings['Win/JAWS'].toggleButton,
    },
    {
      combination: ['aria-haspopup', 'aria-pressed'],
      order: ['aria-pressed', 'aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].toggleButton,
    },
    {
      combination: ['aria-expanded', 'aria-haspopup', 'aria-pressed'],
      order: ['aria-pressed', 'aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].toggleButton,
    },
  ], // End button
  'role=button': 'button',
  'input:text': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].textInput,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].textInput,
    },
    {
      combination: ['aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].textInput,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].textInput,
    },
  ], // End input:text
  'input:checkbox': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['checked', 'aria-required'],
      order: ['checked', 'aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
  ], // End input:checkbox
  'role=checkbox': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-checked', 'aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].checkboxInput,
    },
  ], // End role=checkbox
  'input:radio': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['checked', 'aria-required'],
      order: ['checked', 'aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
  ], // End input:radio
  'role=radio': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-checked', 'aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].radioInput,
    },
  ], // End role=radio
  'role=combobox': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].combobox,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].combobox,
    },
    {
      combination: ['aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].combobox,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].combobox,
    },
  ], // End role=combobox
  textarea: [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].textarea,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].textarea,
    },
    {
      combination: ['aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].textarea,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].textarea,
    },
  ], // End textarea
  a: [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].link,
    },
    {
      combination: ['aria-expanded'],
      elementType: SRMC.typeStrings['Win/JAWS'].link,
    },
    {
      combination: ['aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].link,
    },
    {
      combination: ['aria-expanded', 'aria-haspopup'],
      order: ['aria-expanded', 'aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].link,
    },
  ], // End a
  'role=menuitem': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].menuitem,
    },
    {
      combination: ['aria-haspopup'],
      elementType: SRMC.typeStrings['Win/JAWS'].menuitem,
    },
  ], // End role=menuitem
  'role=menuitemcheckbox': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].menuitemcheckbox,
    },
    {
      combination: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].menuitemcheckbox,
    },
  ], // End role=menuitemcheckbox
  'role=menuitemradio': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].menuitemradio,
    },
    {
      combination: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].menuitemradio,
    },
  ], // End role=menuitemradio
  select: [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].select,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].select,
    },
    {
      combination: ['aria-required'],
      elementType: SRMC.typeStrings['Win/JAWS'].select,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRMC.typeStrings['Win/JAWS'].select,
    },
  ], // End select
  'role=switch': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].switch,
    },
    {
      combination: ['aria-checked'],
      elementType: SRMC.typeStrings['Win/JAWS'].switch,
    },
  ], // End role=switch
  'role=tab': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].tab,
    },
    {
      combination: ['aria-selected'],
      elementType: SRMC.typeStrings['Win/JAWS'].tab,
    },
  ], // End role=tab
  'role=option': [
    {
      combination: [],
      elementType: SRMC.typeStrings['Win/JAWS'].option,
    },
  ], // End role=option
};
