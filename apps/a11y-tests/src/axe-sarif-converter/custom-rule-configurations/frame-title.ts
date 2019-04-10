// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AxeCheckResultFrameExtraData, RulesConfiguration } from '../ruleresults';

const frameTitleId: string = 'get-frame-title';

export const frameTitleConfiguration: RulesConfiguration = {
  checks: [
    {
      id: frameTitleId,
      evaluate: evaluateTitle
    }
  ],
  rule: {
    id: frameTitleId,
    selector: 'frame, iframe',
    any: [frameTitleId],
    enabled: false
  }
};

function evaluateTitle(node: HTMLElement, options: any): boolean {
  const frameTitle = node.title ? node.title.trim() : '';

  const frameResultData: AxeCheckResultFrameExtraData = {
    frameType: node.tagName.toLowerCase(),
    frameTitle
  };
  this.data(frameResultData);

  return !!frameTitle;
}
