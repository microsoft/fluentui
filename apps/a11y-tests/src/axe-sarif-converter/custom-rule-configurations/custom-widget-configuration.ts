// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="../axe-extension.ts" />
import * as AxeUtils from '../axe-utils';
import { generateARIACuesDictionary, generateHTMLCuesDictionary } from '../cues';
import { RulesConfiguration } from '../ruleresults';

const checkId = 'custom-widget';
export const customWidgetConfiguration: RulesConfiguration = {
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

  //@ts-ignore
  this.data(data);

  return true;
}
