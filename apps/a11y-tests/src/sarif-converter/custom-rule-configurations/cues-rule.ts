import * as AxeUtils from '../axe-utils';
import { IKerosRuleConfiguration } from '../iruleresults';
import { getNativeWidgetElementType, createNativeWidgetConfiguration } from './native-widgets-default';
import { generateHTMLCuesDictionary, generateARIACuesDictionary } from '../cues';

export const cuesConfiguration: IKerosRuleConfiguration = createNativeWidgetConfiguration('cues', 'cues-collector', evaluateCues);

export function evaluateCues(node: HTMLElement): boolean {
  // tslint:disable-next-line:no-invalid-this
  this.data({
    element: getNativeWidgetElementType(node),
    accessibleName: AxeUtils.getAccessibleText(node, false),
    htmlCues: generateHTMLCuesDictionary(node),
    ariaCues: generateARIACuesDictionary(node)
  });

  return true;
}
