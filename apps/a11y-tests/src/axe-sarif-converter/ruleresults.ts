// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { WCAG } from './wcag';

export interface AxeRule {
  id: string;
  nodes: AxeNodeResult[];
  description: string;
  help?: string;
}

export interface AxeNodeResult {
  any: FormattedCheckResult[];
  none: FormattedCheckResult[];
  all: FormattedCheckResult[];
  html: string;
  target: string[]; // selector
  failureSummary?: string;
  instanceId?: string;
  snippet?: string;
}

export interface RulesConfiguration {
  checks: CheckConfiguration[];
  rule: RuleConfiguration;
}

export interface AxeConfiguration {
  checks?: CheckConfiguration[];
  rules?: RuleConfiguration[];
}

export interface AxeBranding {
  brand?: string;
  application?: string;
}
export interface RuleConfiguration {
  id: string;
  selector: string;
  excludeHidden?: boolean;
  enabled?: boolean;
  pageLevel?: boolean;
  any?: string[];
  all?: string[];
  none?: string[];
  tags?: string[];
  matches?: (node: any, virtualNode: any) => boolean;
  description?: string;
  help?: string;
  options?: any;
  decorateNode?: (node: AxeNodeResult) => void;
  helpUrl?: string;
}

export interface CheckConfiguration {
  id: string;
  evaluate: (node: any, options: any, virtualNode: any, context: any) => boolean;
  after?: any;
  options?: any;
  enabled?: boolean;
  passMessage?: () => string;
  failMessage?: () => string;
}

export interface FormattedCheckResult {
  id: string;
  message: string;
  data: AxeCheckResultExtraData;
  result?: boolean;
}

export interface AxeCheckResultExtraData {
  headingLevel?: number;
  headingText?: string;
}

export interface AxeCheckResultFrameExtraData {
  frameType?: string;
  frameTitle?: string;
}

export type AxeCoreRuleResult = AxeRule & AxeCoreDecorations;

export interface ScannerResults {
  passes: AxeCoreRuleResult[];
  violations: AxeCoreRuleResult[];
  inapplicable: AxeCoreRuleResult[];
  incomplete: AxeCoreRuleResult[];
  timestamp: string;
  targetPageUrl: string;
  targetPageTitle: string;
}

export interface AxeCoreDecorations {
  WCAG?: WCAG[];
  helpUrl?: string;
}
