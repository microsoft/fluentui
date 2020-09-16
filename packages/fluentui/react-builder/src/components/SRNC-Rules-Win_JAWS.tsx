import SRNC from './SRNC-Definitions';

SRNC.stateRules['Win/JAWS'] = {
  button: [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-expanded'],
      elementType: SRNC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-pressed'],
      elementType: SRNC.typeStrings['Win/JAWS'].toggleButton,
    },
    {
      combination: ['aria-expanded', 'aria-haspopup'],
      order: ['aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].button,
    },
    {
      combination: ['aria-expanded', 'aria-pressed'],
      order: ['aria-pressed'],
      elementType: SRNC.typeStrings['Win/JAWS'].toggleButton,
    },
    {
      combination: ['aria-haspopup', 'aria-pressed'],
      order: ['aria-pressed', 'aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].toggleButton,
    },
    {
      combination: ['aria-expanded', 'aria-haspopup', 'aria-pressed'],
      order: ['aria-pressed', 'aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].toggleButton,
    },
  ], // End button
  'role=button': 'button',
  'input:text': [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].textInput,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].textInput,
    },
    {
      combination: ['aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].textInput,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].textInput,
    },
  ], // End input:text
  'input:checkbox': [
    {
      combination: ['checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['checked', 'aria-required'],
      order: ['checked', 'aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
  ], // End input:checkbox
  'role=checkbox': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
    {
      combination: ['aria-checked', 'aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].checkboxInput,
    },
  ], // End role=checkbox
  'input:radio': [
    {
      combination: ['checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['checked', 'aria-required'],
      order: ['checked', 'aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
  ], // End input:radio
  'role=radio': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
    {
      combination: ['aria-checked', 'aria-required'],
      order: ['aria-checked', 'aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].radioInput,
    },
  ], // End role=radio
  'role=combobox': [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].combobox,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].combobox,
    },
    {
      combination: ['aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].combobox,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].combobox,
    },
  ], // End role=combobox
  textarea: [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].textarea,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].textarea,
    },
    {
      combination: ['aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].textarea,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].textarea,
    },
  ], // End textarea
  a: [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].link,
    },
    {
      combination: ['aria-expanded'],
      elementType: SRNC.typeStrings['Win/JAWS'].link,
    },
    {
      combination: ['aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].link,
    },
    {
      combination: ['aria-expanded', 'aria-haspopup'],
      order: ['aria-expanded', 'aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].link,
    },
  ], // End a
  'role=menuitem': [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].menuitem,
    },
    {
      combination: ['aria-haspopup'],
      elementType: SRNC.typeStrings['Win/JAWS'].menuitem,
    },
  ], // End role=menuitem
  'role=menuitemcheckbox': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].menuitemcheckbox,
    },
    {
      combination: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].menuitemcheckbox,
    },
  ], // End role=menuitemcheckbox
  'role=menuitemradio': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].menuitemradio,
    },
    {
      combination: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].menuitemradio,
    },
  ], // End role=menuitemradio
  select: [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].select,
    },
    {
      combination: ['aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].select,
    },
    {
      combination: ['aria-required'],
      elementType: SRNC.typeStrings['Win/JAWS'].select,
    },
    {
      combination: ['aria-invalid', 'aria-required'],
      order: ['aria-required', 'aria-invalid'],
      elementType: SRNC.typeStrings['Win/JAWS'].select,
    },
  ], // End select
  'role=switch': [
    {
      combination: [],
      order: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].switch,
    },
    {
      combination: ['aria-checked'],
      elementType: SRNC.typeStrings['Win/JAWS'].switch,
    },
  ], // End role=switch
  'role=tab': [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].tab,
    },
    {
      combination: ['aria-selected'],
      elementType: SRNC.typeStrings['Win/JAWS'].tab,
    },
  ], // End role=tab
  'role=option': [
    {
      combination: [],
      elementType: SRNC.typeStrings['Win/JAWS'].option,
    },
  ], // End role=option
};
