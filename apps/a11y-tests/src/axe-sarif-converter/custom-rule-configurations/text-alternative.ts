// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/// <reference path="../axe-extension.ts" />
import * as AxeUtils from '../axe-utils';

import { RulesConfiguration } from '../ruleresults';
import { isImage } from './image-rule';

export const textAlternativeConfiguration: RulesConfiguration = {
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

function matches(node: HTMLElement, virtualNode?: HTMLElement): boolean {
  return isImage(node, undefined) && AxeUtils.getImageCodedAs(node) === 'Meaningful';
}

function evaluateTextAlternative(node: HTMLElement): boolean {
  const accessibleName: string = AxeUtils.getAccessibleText(node, false);
  const accessibleDescription: string = AxeUtils.getAccessibleDescription(node);
  const imageType: string = AxeUtils.getImageType(node);

  //@ts-ignore
  this.data({
    imageType,
    accessibleName,
    accessibleDescription
  });

  return true;
}
