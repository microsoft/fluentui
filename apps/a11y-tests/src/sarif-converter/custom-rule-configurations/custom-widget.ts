/// <reference path="../axe-extension.d.ts" />
import * as AxeUtils from '../axe-utils';
import { IKerosRuleConfiguration } from '../iruleresults';
import { generateHTMLCuesDictionary, generateARIACuesDictionary } from '../cues';

const checkId = 'custom-widget';
export const customWidgetConfiguration: IKerosRuleConfiguration = {
  checks: [
    {
      id: checkId,
      evaluate: evaluateCustomWidget
    }
  ],
  rule: {
    id: 'custom-widget',
    selector: createSelector(),
    enabled: false,
    any: [checkId]
  }
};

function createSelector(): string {
  const roles = [
    'alert',
    'alertdialog',
    'button',
    'checkbox',
    'combobox',
    'dialog',
    'feed',
    'grid',
    'link',
    'listbox',
    'menu',
    'menubar',
    'radiogroup',
    'separator',
    'slider',
    'spinbutton',
    'table',
    'tablist',
    'toolbar',
    'tooltip',
    'tree',
    'treegrid'
  ];

  const selectors: string[] = [];
  roles.forEach((role: string) => {
    selectors.push('[role=' + role + ']');
  });

  return selectors.join(',');
}

function evaluateCustomWidget(node: HTMLElement): boolean {
  const text = AxeUtils.getAccessibleText(node, false);
  const role = node.getAttribute('role');
  const describedBy = AxeUtils.getAccessibleDescription(node);
  const htmlCues = generateHTMLCuesDictionary(node);
  const ariaCues = generateARIACuesDictionary(node);

  const data = {
    text,
    role,
    describedBy,
    htmlCues,
    ariaCues
  };

  // tslint:disable-next-line:no-invalid-this
  this.data(data);

  return true;
}
