// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { colorConfiguration } from './custom-rule-configurations/color-rule';
import { cuesConfiguration } from './custom-rule-configurations/cues-rule';
import { customWidgetConfiguration } from './custom-rule-configurations/custom-widget-configuration';
import { frameTitleConfiguration } from './custom-rule-configurations/frame-title';
import { headingConfiguration } from './custom-rule-configurations/heading-rule';
import { imageConfiguration } from './custom-rule-configurations/image-rule';
import { landmarkConfiguration } from './custom-rule-configurations/landmark-rule';
import { linkFunctionConfiguration } from './custom-rule-configurations/link-function';
import { linkPurposeConfiguration } from './custom-rule-configurations/link-purpose';
import { nativeWidgetsDefaultConfiguration } from './custom-rule-configurations/native-widgets-default';
import { pageConfiguration } from './custom-rule-configurations/page-title';
import { textAlternativeConfiguration } from './custom-rule-configurations/text-alternative';
import { textContrastConfiguration } from './custom-rule-configurations/text-contrast';
import { widgetFunctionConfiguration } from './custom-rule-configurations/widget-function';
import { RulesConfiguration } from './ruleresults';

export const CustomRuleConfigurations: RulesConfiguration[] = [
  headingConfiguration,
  colorConfiguration,
  landmarkConfiguration,
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
