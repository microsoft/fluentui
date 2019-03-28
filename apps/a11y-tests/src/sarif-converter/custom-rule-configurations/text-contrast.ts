/// <reference path="../axe-extension.d.ts" />
import * as AxeUtils from '../axe-utils';

import { IKerosRuleConfiguration } from '../iruleresults';

export const textContrastConfiguration: IKerosRuleConfiguration = {
  checks: [
    {
      id: 'text-contrast',
      evaluate: evaluateTextContrast
    }
  ],
  rule: {
    id: 'text-contrast',
    selector: '*',
    any: ['text-contrast'],
    all: [],
    matches: AxeUtils.getMatchesFromRule('color-contrast'),
    excludeHidden: false,
    options: {
      noScroll: false
    },
    enabled: false
  }
};

function evaluateTextContrast(node: HTMLElement, options: any, virtualNode: any, context: any): boolean {
  const checkResult = AxeUtils.getEvaluateFromCheck('color-contrast').call(this, node, options, virtualNode, context);
  const nodeStyle = window.getComputedStyle(node);
  const fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
  const fontWeight = nodeStyle.getPropertyValue('font-weight');
  const bold = ['bold', 'bolder', '600', '700', '800', '900'].indexOf(fontWeight) !== -1;

  const data = {
    textString: node.innerText,
    size: isLargeText(fontSize, bold) ? 'large' : 'regular'
  };

  this.data(data);
  return checkResult;
}

function isLargeText(fontSize: number, bold: boolean): boolean {
  fontSize = (fontSize * 72) / 96;
  return fontSize >= 18 || (fontSize >= 14 && bold);
}
