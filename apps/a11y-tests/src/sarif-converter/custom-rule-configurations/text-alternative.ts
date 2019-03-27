/// <reference path="../axe-extension.d.ts" />
import * as axe from 'axe-core';
import * as AxeUtils from '../axe-utils';

import { isImage } from './image-rule';
import { IKerosRuleConfiguration } from '../iruleresults';

export const textAlternativeConfiguration: IKerosRuleConfiguration = {
  checks: [
    {
      id: 'text-alternative-data-collector',
      evaluate: evaluateTextAlternative
    }
  ],
  rule: {
    id: 'accessible-image',
    selector: '*',
    any: ['text-alternative-data-collector'],
    all: [],
    matches: matches,
    enabled: false
  }
};

function matches(node: HTMLElement, virtualNode: HTMLElement): boolean {
  return isImage(node, null) && AxeUtils.getImageCodedAs(node) === 'Meaningful';
}

function evaluateTextAlternative(node: HTMLElement): boolean {
  const accessibleName: string = AxeUtils.getAccessibleText(node, false);
  const accessibleDescription: string = AxeUtils.getAccessibleDescription(node);
  const imageType: string = AxeUtils.getImageType(node);

  this.data({
    imageType,
    accessibleName,
    accessibleDescription
  });

  return true;
}
