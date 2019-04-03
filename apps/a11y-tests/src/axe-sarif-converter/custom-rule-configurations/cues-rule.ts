// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as AxeUtils from '../axe-utils';
import { generateARIACuesDictionary, generateHTMLCuesDictionary } from '../cues';
import { RulesConfiguration } from '../ruleresults';
import { createNativeWidgetConfiguration, getNativeWidgetElementType } from './native-widgets-default';

export const cuesConfiguration: RulesConfiguration = createNativeWidgetConfiguration('cues', 'cues-collector', evaluateCues);

export function evaluateCues(node: HTMLElement): boolean {
  //@ts-ignore
  this.data({
    element: getNativeWidgetElementType(node),
    accessibleName: AxeUtils.getAccessibleText(node, false),
    htmlCues: generateHTMLCuesDictionary(node),
    ariaCues: generateARIACuesDictionary(node)
  });

  return true;
}
