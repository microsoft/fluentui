import { IMas } from './mas';

// tslint:disable-next-line:interface-name
export interface AxeRule {
  id: string;
  nodes: AxeNodeResult[];
  description: string;
  help?: string;
}

// tslint:disable-next-line:interface-name
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

export interface IKerosRuleConfiguration {
  checks: ICheckConfiguration[];
  rule: IRuleConfiguration;
}

export interface IAxeConfiguration {
  checks?: ICheckConfiguration[];
  rules?: IRuleConfiguration[];
}

export interface IAxeBranding {
  brand?: string;
  application?: string;
}
export interface IRuleConfiguration {
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

export interface ICheckConfiguration {
  id: string;
  evaluate: (node: any, options: any, virtualNode: any, context: any) => boolean;
  after?: any;
  options?: any;
  enabled?: boolean;
  passMessage?: () => string;
  failMessage?: () => string;
}

// tslint:disable-next-line:interface-name
export interface FormattedCheckResult {
  id: string;
  message: string;
  data: IAxeCheckResultExtraData;
  result?: boolean;
}

export interface IAxeCheckResultExtraData {
  headingLevel?: number;
  headingText?: string;
}

export interface IAxeCheckResultFrameExtraData {
  frameType?: string;
  frameTitle?: string;
}

export type IChiselRuleResult = AxeRule & IChiselDecorations;

export interface IChiselResults {
  passes: IChiselRuleResult[];
  violations: IChiselRuleResult[];
  inapplicable: IChiselRuleResult[];
  incomplete: IChiselRuleResult[];
  timestamp: string;
  targetPageUrl: string;
  targetPageTitle: string;
}

export interface IChiselDecorations {
  MAS?: IMas[];
  chiselHelpUrl?: string;
}
