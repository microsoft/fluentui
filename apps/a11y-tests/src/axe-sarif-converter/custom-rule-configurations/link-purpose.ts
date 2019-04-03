// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="../axe-extension.ts" />
import * as AxeUtils from '../axe-utils';
import { RoleUtils } from '../role-utils';
import { RulesConfiguration } from '../ruleresults';

const checkId = 'link-purpose';
const hasValidRoleIfPresent = 'valid-role-if-present';

export const linkPurposeConfiguration: RulesConfiguration = {
  checks: [
    {
      id: checkId,
      evaluate: evaluateLinkPurpose
    },
    {
      id: hasValidRoleIfPresent,
      evaluate: RoleUtils.isValidRoleIfPresent
    }
  ],
  rule: {
    id: 'link-purpose',
    selector: 'a',
    any: [checkId],
    all: [hasValidRoleIfPresent],
    none: ['has-widget-role'],
    enabled: false
  }
};

function evaluateLinkPurpose(node: HTMLElement, options: any, virtualNode: any, context: any): boolean {
  const accessibleName: string = AxeUtils.getAccessibleText(node, false);
  const accessibleDescription: string = AxeUtils.getAccessibleDescription(node);
  const url = node.getAttribute('href');

  const data = {
    accessibleName,
    accessibleDescription,
    url
  };

  // @ts-ignore
  this.data(data);
  return true;
}
