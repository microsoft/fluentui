// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AxeCheckResultExtraData, RulesConfiguration } from '../ruleresults';

const headingCheckId: string = 'collect-headings';

export const headingConfiguration: RulesConfiguration = {
  checks: [
    {
      id: headingCheckId,
      evaluate: evaluateCodedHeadings
    }
  ],
  rule: {
    id: 'collect-headings',
    selector: 'h1,h2,h3,h4,h5,h6,[role=heading]',
    any: [headingCheckId],
    enabled: false
  }
};

function evaluateCodedHeadings(node: HTMLElement, options: any): boolean {
  const headingText: string = node.innerText;
  let headingLevel: number | undefined = undefined;

  const ariaHeadingLevel: string | null = node.getAttribute('aria-level');
  if (ariaHeadingLevel !== null) {
    headingLevel = parseInt(ariaHeadingLevel, 10);
  } else {
    const codedHeadingLevel = node.tagName.match(/H(\d)/);
    if (codedHeadingLevel) {
      headingLevel = parseInt(codedHeadingLevel[1], 10);
    }
  }

  const headingResultData: AxeCheckResultExtraData = {
    headingLevel: headingLevel,
    headingText: headingText
  };

  this.data(headingResultData);
  return true;
}
