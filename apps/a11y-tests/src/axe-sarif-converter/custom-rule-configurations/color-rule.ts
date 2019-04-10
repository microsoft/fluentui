// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { RulesConfiguration } from '../ruleresults';

const colorCheckId: string = 'select-body';

export const colorConfiguration: RulesConfiguration = {
  checks: [
    {
      id: colorCheckId,
      evaluate: () => true
    }
  ],
  rule: {
    id: 'select-body',
    selector: 'body',
    any: [colorCheckId],
    matches: () => isInTopWindow(window),
    enabled: false
  }
};

export function isInTopWindow(win: any) {
  return win.top === win;
}
