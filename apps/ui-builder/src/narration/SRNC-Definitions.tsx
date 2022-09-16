export const SRNC: Record<string, any> = {
  PARTS_SEPARATOR: ' ',
  LANDMARKS_AND_GROUPS_SEPARATOR: ' ',
  STATES_SEPARATOR: ' ',
  DESCBY_AND_LABBY_SEPARATOR: ' ',

  // Platforms inheritance definitions
  inheritance: {
    'Win/JAWS/VPC': 'Win/JAWS',
  }, // End inheritance

  // Platforms on which "aria-label" or "aria-labelledby" is narrated even when not present together with a landmark or group element or role
  narrateLabelIfNoRole: ['Win/JAWS'],

  // Platforms on which "the "<header>" and "<footer>" elements create a landmark even if they are a descendant of a sectioning role, e.g., role="article"
  hfLandmarkInSectionRole: ['Win/JAWS'],

  // Platforms on which "the description part of the narration is not narrated
  ignoreDescription: ['Win/JAWS/VPC'],

  // Platforms on which "the usage part of the narration is not narrated
  ignoreUsage: ['Win/JAWS/VPC'],

  // Platforms on which "the position and level parts of the narration are not narrated
  ignorePositionAndLevel: ['Win/JAWS/VPC'],

  // Platforms on which the "contains text" string in case of <textarea> element overrides the description when the <textarea> contains text
  stringOverridesDescription: ['Win/JAWS'],

  // [contains text" string definitions for each platform
  containsText: {
    'Win/JAWS': 'Contains text',
  }, // End containsText

  // Positions string definitions for each platform
  positions: {
    'Win/JAWS': '[X] of [Y]',
  }, // End position

  // Levels string definitions for each platform
  levels: {
    'Win/JAWS': '[level]',
  }, // End level

  // Element names and roles which are narrated when entered only if they also have the "aria-label" or "aria-labelledby" attribute
  narrateOnlyWhenLabelled: {
    'Win/JAWS': ['role=radiogroup', 'role=tablist'],
  }, // End narrateOnlyWhenLabelled

  // Landmark, group, composite and other element names and roles which are ignored together with their label
  ignoredLandmarksAndGroups: {
    'Win/JAWS/VPC': [
      'aside',
      'footer',
      'header',
      'role=banner',
      'role=complementary',
      'role=contentinfo',
      'role=form',
      'role=region',
      'role=search',
      'role=grid',
      'role=menu',
      'role=menubar',
      'role=treegrid',
    ],
  }, // End narrateOnlyWhenLabelled

  // Element names and roles which ignore the "aria-label" and "aria-labelledby" attributes
  ignoreLabel: {
    'Win/JAWS/VPC': ['role=listbox', 'role=toolbar'],
  }, // End narrateOnlyWhenLabelled

  // Landmarks and groups (the definitions are stored in a separate file per each platform)
  landmarksAndGroups: {
    'Win/JAWS': {},
  }, // End landmarksAndGroups

  // Element types (the definitions are stored in a separate file per each platform)
  elementTypes: {
    'Win/JAWS': {},
  }, // End elementTypes

  // Possible state attributes for each definition name
  possibleStates: {
    button: ['aria-expanded', 'aria-haspopup', 'aria-pressed'],
    'input:text': ['aria-invalid', 'aria-required'],
    'role=searchbox': ['aria-invalid', 'aria-required'],
    'input:checkbox': ['checked', 'aria-required', 'aria-invalid'],
    'role=checkbox': ['aria-checked', 'aria-required', 'aria-invalid'],
    'input:radio': ['checked', 'aria-required', 'aria-invalid'],
    'role=radio': ['aria-checked', 'aria-required', 'aria-invalid'],
    'role=combobox': ['aria-invalid', 'aria-required'],
    textarea: ['aria-invalid', 'aria-required'],
    a: ['aria-expanded', 'aria-haspopup', 'aria-pressed'],
    'role=menuitem': ['aria-haspopup'],
    'role=menuitemcheckbox': ['aria-checked'],
    'role=menuitemradio': ['aria-checked'],
    select: ['aria-invalid', 'aria-required'],
    'role=switch': ['aria-checked'],
    'role=treeitem': ['aria-expanded'],
    'role=tab': ['aria-selected'],
    'role=gridcell': ['aria-selected', 'aria-haspopup'],
  }, // End possibleStates

  // State attributes of which "false" value means the attribute is not present
  falseMeansNotPresent: ['aria-haspopup', 'aria-invalid', 'aria-required'],

  // Rules for the type and state narration parts computation based on the element state attributes combination (the definitions are stored in a separate file per each platform)
  stateRules: {
    'Win/JAWS': {},
  }, // End stateRules

  // Element states (the definitions for each definition name are stored in a separate file per each platform)
  elementStates: {
    'Win/JAWS': {},
  }, // End elementStates

  // Usages (the definitions for each definition name are stored in a separate file per each platform)
  // If there are more matching states per definition name, the last usage definition will be used
  usages: {
    'Win/JAWS': {},
  }, // End usages

  // Reading order of the narration parts (the definitions for each definition name are stored in a separate file per each platform)
  readingOrder: {
    'Win/JAWS': {},
  }, // End readingOrder
};
