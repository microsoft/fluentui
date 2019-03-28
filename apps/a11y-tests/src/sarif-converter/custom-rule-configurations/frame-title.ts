import { IAxeCheckResultFrameExtraData, IKerosRuleConfiguration } from '../iruleresults';

const frameTitleId: string = 'get-frame-title';

export const frameTitleConfiguration: IKerosRuleConfiguration = {
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

  const frameResultData: IAxeCheckResultFrameExtraData = {
    frameType: node.tagName.toLowerCase(),
    frameTitle
  };

  this.data(frameResultData);

  return !!frameTitle;
}
