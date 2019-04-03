// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="../axe-extension.ts" />
import * as AxeUtils from '../axe-utils';
import { RoleUtils } from '../role-utils';
import { AxeNodeResult, RulesConfiguration } from '../ruleresults';

const checkId = 'link-function';
const snippetKey = 'snippet';
const hasValidRoleIfPresent = 'valid-role-if-present';
export const linkFunctionConfiguration: RulesConfiguration = {
  checks: [
    {
      id: checkId,
      evaluate: evaluateLinkFunction
    },
    {
      id: hasValidRoleIfPresent,
      evaluate: RoleUtils.isValidRoleIfPresent
    }
  ],
  rule: {
    id: 'link-function',
    selector: 'a',
    any: [checkId],
    all: [hasValidRoleIfPresent],
    none: ['has-widget-role'],
    matches: matches,
    decorateNode: (node: AxeNodeResult) => {
      if (node.any.length > 0) {
        // @ts-ignore
        node.snippet = node.any[0].data[snippetKey];
      }
    },
    enabled: false
  }
};

function matches(node: HTMLElement, virtualNode: HTMLElement): boolean {
  const href = node.getAttribute('href');
  return !href || AxeUtils.hasCustomWidgetMarkup(node);
}

function evaluateLinkFunction(node: HTMLElement, options: any, virtualNode: any, context: any): boolean {
  const accessibleName = AxeUtils.getAccessibleText(node, false);
  const ariaValues = AxeUtils.getPropertyValuesMatching(node, /^aria-/);
  const role = node.getAttribute('role');
  const tabIndex = node.getAttribute('tabindex');
  const url = node.getAttribute('href');

  const missingNameOrUrl = !accessibleName || !url;

  const parentOuterHtml = node.parentElement ? node.parentElement.outerHTML : null;

  const snippet = missingNameOrUrl ? parentOuterHtml : node.outerHTML;

  // @ts-ignore
  this.data({
    accessibleName,
    ariaAttributes: ariaValues,
    role,
    tabIndex,
    url,
    snippetKey: snippet
  });

  return true;
}
