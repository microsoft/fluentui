import { IKerosRuleConfiguration } from './iruleresults';

import { textContrastConfiguration } from './custom-rule-configurations/text-contrast';
import { textAlternativeConfiguration } from './custom-rule-configurations/text-alternative';
import { colorConfiguration } from './custom-rule-configurations/color-rule';
import { headingConfiguration } from './custom-rule-configurations/heading-rule';
import { uniqueLandmarkConfiguration } from './custom-rule-configurations/unique-landmark';
import { imageConfiguration } from './custom-rule-configurations/image-rule';
import { landmarkConfiguration } from './custom-rule-configurations/landmark-rule';
import { linkPurposeConfiguration } from './custom-rule-configurations/link-purpose';
import { linkFunctionConfiguration } from './custom-rule-configurations/link-function';
import { frameTitleConfiguration } from './custom-rule-configurations/frame-title';
import { pageConfiguration } from './custom-rule-configurations/page-title';
import { widgetFunctionConfiguration } from './custom-rule-configurations/widget-function';
import { nativeWidgetsDefaultConfiguration } from './custom-rule-configurations/native-widgets-default';
import { cuesConfiguration } from './custom-rule-configurations/cues-rule';
import { customWidgetConfiguration } from './custom-rule-configurations/custom-widget';

export const configuration: IKerosRuleConfiguration[] = [
  headingConfiguration,
  colorConfiguration,
  landmarkConfiguration,
  uniqueLandmarkConfiguration,
  imageConfiguration,
  textAlternativeConfiguration,
  textContrastConfiguration,
  linkPurposeConfiguration,
  linkFunctionConfiguration,
  frameTitleConfiguration,
  pageConfiguration,
  widgetFunctionConfiguration,
  nativeWidgetsDefaultConfiguration,
  cuesConfiguration,
  customWidgetConfiguration
];
