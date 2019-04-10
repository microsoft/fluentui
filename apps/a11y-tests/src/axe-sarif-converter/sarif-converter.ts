// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { DictionaryStringTo } from './dictionary-types';
import { ScannerOptions } from './exposed-apis';
import { AxeCoreRuleResult, AxeNodeResult, FormattedCheckResult, ScannerResults } from './ruleresults';
import * as CustomSarif from './sarif/custom-sarif-types';
import { SarifLog } from './sarif/sarifLog';
import * as Sarif from './sarif/sarifv2';
import { StringUtils } from './string-utils';
import { WCAG, WCAGData } from './wcag';

export class SarifConverter {
  private wcagList: WCAGData;

  constructor(wcagList: WCAGData) {
    this.wcagList = wcagList;
  }

  public convert(results: ScannerResults, options: ScannerOptions): SarifLog {
    return {
      version: CustomSarif.SarifLogVersion.v2,
      runs: [this.convertRun(results, options)]
    };
  }

  private convertRun(results: ScannerResults, options: ScannerOptions): Sarif.Run {
    const files: DictionaryStringTo<Sarif.File> = {};
    files[results.targetPageUrl] = {
      mimeType: 'text/html',
      properties: {
        tags: ['target'],
        title: results.targetPageTitle
      }
    };

    let properties: DictionaryStringTo<string> = {};

    if (options && options.scanName !== undefined) {
      properties = {
        scanName: options.scanName
      };
    }

    const run: Sarif.Run = {
      tool: {
        name: 'axe',
        fullName: 'axe-core',
        semanticVersion: '3.2.2',
        version: '3.2.2',
        properties: {
          downloadUri: 'https://www.deque.com/axe/'
        }
      },
      invocations: [
        {
          startTime: results.timestamp,
          endTime: results.timestamp
        }
      ],
      files: files,
      results: this.convertResults(results, properties),
      resources: {
        rules: this.convertResultsToRules(results)
      },
      properties: {
        standards: this.convertStandards()
      }
    };

    if (options && options.testCaseId !== undefined) {
      run.properties!.testCaseId = options.testCaseId;
    }

    if (options && options.scanId !== undefined) {
      run.logicalId = options.scanId;
    }

    return run;
  }

  private convertResults(results: ScannerResults, properties: DictionaryStringTo<string>): Sarif.Result[] {
    const resultArray: Sarif.Result[] = [];

    this.convertRuleResults(resultArray, results.violations, CustomSarif.Result.level.error, results.targetPageUrl, properties);
    this.convertRuleResults(resultArray, results.passes, CustomSarif.Result.level.pass, results.targetPageUrl, properties);
    this.convertRuleResults(resultArray, results.incomplete, CustomSarif.Result.level.open, results.targetPageUrl, properties);
    this.convertRuleResultsWithoutNodes(resultArray, results.inapplicable, CustomSarif.Result.level.notApplicable, properties);

    return resultArray;
  }

  private convertRuleResults(
    resultArray: Sarif.Result[],
    ruleResults: AxeCoreRuleResult[],
    level: CustomSarif.Result.level,
    targetPageUrl: string,
    properties: DictionaryStringTo<string>
  ): void {
    if (ruleResults) {
      for (const ruleResult of ruleResults) {
        this.convertRuleResult(resultArray, ruleResult, level, targetPageUrl, properties);
      }
    }
  }

  private convertRuleResult(
    resultArray: Sarif.Result[],
    ruleResult: AxeCoreRuleResult,
    level: CustomSarif.Result.level,
    targetPageUrl: string,
    properties: DictionaryStringTo<string>
  ): void {
    const partialFingerprints: DictionaryStringTo<string> = this.getPartialFingerprintsFromRule(ruleResult);

    for (const node of ruleResult.nodes) {
      const selector = node.target.join(';');
      resultArray.push({
        ruleId: ruleResult.id,
        level: level,
        message: this.convertMessage(node, level),
        locations: [
          {
            physicalLocation: {
              fileLocation: {
                uri: targetPageUrl
              }
            },
            fullyQualifiedLogicalName: selector,
            annotations: [
              {
                snippet: {
                  text: node.html
                }
              }
            ]
          }
        ],
        properties: {
          ...properties,
          tags: ['Accessibility']
        },
        partialFingerprints: {
          fullyQualifiedLogicalName: selector,
          ...partialFingerprints
        }
      });
    }
  }

  private getPartialFingerprintsFromRule(ruleResult: AxeCoreRuleResult): DictionaryStringTo<string> {
    return {
      ruleId: ruleResult.id
    };
  }

  private convertMessage(node: AxeNodeResult, level: CustomSarif.Result.level): CustomSarif.Message {
    const textArray: string[] = [];
    const richTextArray: string[] = [];

    if (level === CustomSarif.Result.level.error) {
      const allAndNone = node.all.concat(node.none);
      this.convertMessageChecks('Fix all of the following:', allAndNone, textArray, richTextArray);
      this.convertMessageChecks('Fix any of the following:', node.any, textArray, richTextArray);
    } else {
      const allNodes = node.all.concat(node.none).concat(node.any);
      this.convertMessageChecks('The following tests passed:', allNodes, textArray, richTextArray);
    }

    return {
      text: textArray.join(' '),
      richText: richTextArray.join('\n\n')
    };
  }

  private convertMessageChecks(heading: string, checkResults: FormattedCheckResult[], textArray: string[], richTextArray: string[]): void {
    if (checkResults.length > 0) {
      const textLines: string[] = [];
      const richTextLines: string[] = [];

      textLines.push(heading);
      richTextLines.push(this.escapeForMarkdown(heading));

      for (const checkResult of checkResults) {
        const message = StringUtils.isNotEmpty(checkResult.message) ? checkResult.message : checkResult.id;

        textLines.push(message + '.');
        richTextLines.push('- ' + this.escapeForMarkdown(message));
      }

      textArray.push(textLines.join(' '));
      richTextArray.push(richTextLines.join('\n'));
    }
  }

  private escapeForMarkdown(s: string): string {
    return s ? s.replace(/</g, '&lt;') : '';
  }

  private convertRuleResultsWithoutNodes(
    resultArray: Sarif.Result[],
    ruleResults: AxeCoreRuleResult[],
    level: CustomSarif.Result.level,
    properties: DictionaryStringTo<string>
  ): void {
    if (ruleResults) {
      for (const ruleResult of ruleResults) {
        const partialFingerprints = this.getPartialFingerprintsFromRule(ruleResult);
        resultArray.push({
          ruleId: ruleResult.id,
          level: level,
          properties: {
            ...properties,
            tags: ['Accessibility']
          },
          partialFingerprints: partialFingerprints
        });
      }
    }
  }

  private convertResultsToRules(results: ScannerResults): DictionaryStringTo<Sarif.Rule> {
    const rulesDictionary: DictionaryStringTo<Sarif.Rule> = {};

    this.convertRuleResultsToRules(rulesDictionary, results.violations);
    this.convertRuleResultsToRules(rulesDictionary, results.passes);
    this.convertRuleResultsToRules(rulesDictionary, results.inapplicable);
    this.convertRuleResultsToRules(rulesDictionary, results.incomplete);

    return rulesDictionary;
  }

  private convertRuleResultsToRules(rulesDictionary: DictionaryStringTo<Sarif.Rule>, ruleResults: AxeCoreRuleResult[]): void {
    if (ruleResults) {
      for (const ruleResult of ruleResults) {
        this.convertRuleResultToRule(rulesDictionary, ruleResult);
      }
    }
  }

  private convertRuleResultToRule(rulesDictionary: DictionaryStringTo<Sarif.Rule>, ruleResult: AxeCoreRuleResult): void {
    if (!rulesDictionary.hasOwnProperty(ruleResult.id)) {
      const rule: Sarif.Rule = {
        id: ruleResult.id,
        name: {
          text: ruleResult.help
        },
        fullDescription: {
          text: ruleResult.description
        },
        helpUri: ruleResult.helpUrl,
        properties: {
          standards: this.convertStandardsForRule(ruleResult.WCAG!)
        }
      };
      rulesDictionary[ruleResult.id] = rule;
    }
  }

  private convertStandardsForRule(wcagList: WCAG[]): string[] {
    const standards: string[] = [];
    if (wcagList !== undefined) {
      for (const wcag of wcagList) {
        standards.push(wcag.text);
      }
    }
    return standards;
  }

  private convertStandards(): DictionaryStringTo<AxeCoreStandard> {
    const standards: DictionaryStringTo<AxeCoreStandard> = {};

    Object.keys(this.wcagList).forEach(key => {
      const wcag = this.wcagList[key];
      if (wcag.title) {
        standards[wcag.text] = {
          standardName: {
            text: 'WCAG'
          },
          requirementName: {
            text: wcag.title
          },
          requirementId: wcag.text,
          requirementUri: wcag.url!
        };
      }
    });
    return standards;
  }
}

export interface AxeCoreStandard {
  standardName: CustomSarif.Message;
  requirementName: CustomSarif.Message;
  requirementId: string;
  requirementUri: string;
}
