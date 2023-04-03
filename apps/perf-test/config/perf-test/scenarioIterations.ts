import type { ScenarioIterations } from '@fluentui/scripts-tasks';

// You don't have to add scenarios to this structure unless you want their iterations to differ from the default.
export const scenarioIterations: ScenarioIterations = {
  DocumentCardTitle: 1000,
  Breadcrumb: 1000,
  CommandBar: 1000,
  Nav: 1000,
  Pivot: 1000,
  Tabs: 1000,
  Panel: 1000,
  Dialog: 1000,
  ComboBox: 1000,
  Persona: 1000,
  ContextualMenu: 1000,
  /* List performance is generally more influenced by the size
   * of the list rather than the number of lists on a page.
   */
  GroupedList: 2,
  GroupedListV2: 2,
};
