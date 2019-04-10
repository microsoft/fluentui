// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="../axe-extension.ts" />
import * as axe from 'axe-core';

import * as AxeUtils from '../axe-utils';
import { RulesConfiguration } from '../ruleresults';

export const imageConfiguration: RulesConfiguration = {
  checks: [
    {
      id: 'image-function-data-collector',
      evaluate: evaluateImageFunction
    }
  ],
  rule: {
    id: 'image-function',
    selector: '*',
    any: ['image-function-data-collector'],
    all: [],
    matches: isImage,
    enabled: false
  }
};

export function isImage(node: HTMLElement, virtualNode?: HTMLElement): boolean {
  const selector: string = 'img, [role=img], svg';
  if (axe.utils.matchesSelector(node, selector)) {
    return true;
  }
  if (node.tagName.toLowerCase() === 'i' && node.innerHTML === '') {
    return true;
  }
  if (AxeUtils.hasBackgoundImage(node)) {
    return true;
  }

  return false;
}

export function evaluateImageFunction(node: HTMLElement): boolean {
  const accessibleName: string = AxeUtils.getAccessibleText(node, false);
  const codedAs: string = AxeUtils.getImageCodedAs(node);
  const imageType: string = AxeUtils.getImageType(node);

  this.data({
    imageType,
    accessibleName,
    codedAs
  });

  return true;
}
