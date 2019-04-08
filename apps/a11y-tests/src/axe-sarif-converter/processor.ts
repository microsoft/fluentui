// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AxeNodeResult, AxeRule } from './ruleresults';

export namespace Processor {
  export let suppressedMessages = [
    // add messages to suppress here. Remove comment when non-empty.
  ].map(normalizeText);

  function normalizeText(text: string): string {
    return text.toLowerCase().trim();
  }

  export function suppressChecksByMessages(rule: AxeRule, removeEmptyRules = true): AxeRule | undefined {
    rule.nodes = rule.nodes.filter((nodeResult: AxeNodeResult) => {
      nodeResult.any = nodeResult.any.filter((check: any) => {
        return check.message !== undefined ? suppressedMessages.indexOf(normalizeText(check.message)) < 0 : true;
      });

      return nodeResult.any.length > 0 || nodeResult.none.length > 0 || nodeResult.all.length > 0;
    });

    if (removeEmptyRules && rule.nodes.length === 0) {
      return undefined;
    }

    return rule;
  }
}
