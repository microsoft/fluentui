import { IDictionaryStringTo } from './dictionary-types';
import { IChiselOptions } from './exposed-apis';
import { AxeNodeResult, FormattedCheckResult, IChiselResults, IChiselRuleResult } from './iruleresults';
import { IMas, IMasData } from './mas';
import * as CustomSarif from './sarif/custom-sarif-types';
import { ISarifLog } from './sarif/isarflog';
import * as Sarif from './sarif/sarifv2';
import { StringUtils } from './string-utils';

export class SarifConverter {
  private masList: IMasData;

  constructor(masList: IMasData) {
    this.masList = masList;
  }

  public convert(results: IChiselResults, options: IChiselOptions): ISarifLog {
    const log: ISarifLog = {
      version: CustomSarif.SarifLogVersion.v2,
      runs: [this._convertRun(results, options)]
    };
    return log;
  }

  private _convertRun(results: IChiselResults, options: IChiselOptions): Sarif.Run {
    const files: IDictionaryStringTo<Sarif.File> = {};
    files[results.targetPageUrl] = {
      mimeType: 'text/html',
      properties: {
        tags: ['target'],
        title: results.targetPageTitle
      }
    };

    let properties: IDictionaryStringTo<string> = {};

    if (options && options.scanName !== undefined) {
      properties = {
        scanName: options.scanName
      };
    }

    const run: Sarif.Run = {
      tool: {
        name: 'Chisel',
        fullName: 'Chisel',
        semanticVersion: '1.0.0',
        version: '1.0.0',
        properties: {
          downloadUri: 'https://aka.ms/keros'
        }
      },
      invocations: [
        {
          startTime: results.timestamp,
          endTime: results.timestamp
        }
      ],
      files: files,
      results: this._convertResults(results, properties),
      resources: {
        rules: this._convertResultsToRules(results)
      },
      properties: {
        standards: this._convertStandards()
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

  private _convertResults(results: IChiselResults, properties: IDictionaryStringTo<string>): Sarif.Result[] {
    const resultArray: Sarif.Result[] = [];

    this._convertRuleResults(resultArray, results.violations, CustomSarif.Result.level.error, results.targetPageUrl, properties);
    this._convertRuleResults(resultArray, results.passes, CustomSarif.Result.level.pass, results.targetPageUrl, properties);
    this._convertRuleResults(resultArray, results.incomplete, CustomSarif.Result.level.open, results.targetPageUrl, properties);
    this._convertRuleResultsWithoutNodes(resultArray, results.inapplicable, CustomSarif.Result.level.notApplicable, properties);

    return resultArray;
  }

  private _convertRuleResults(
    resultArray: Sarif.Result[],
    ruleResults: IChiselRuleResult[],
    level: CustomSarif.Result.level,
    targetPageUrl: string,
    properties: IDictionaryStringTo<string>
  ): void {
    if (ruleResults) {
      for (const ruleResult of ruleResults) {
        this._convertRuleResult(resultArray, ruleResult, level, targetPageUrl, properties);
      }
    }
  }

  private _convertRuleResult(
    resultArray: Sarif.Result[],
    ruleResult: IChiselRuleResult,
    level: CustomSarif.Result.level,
    targetPageUrl: string,
    properties: IDictionaryStringTo<string>
  ): void {
    const partialFingerprints: IDictionaryStringTo<string> = this._getPartialFingerprintsFromRule(ruleResult);

    for (const node of ruleResult.nodes) {
      const selector = node.target.join(';');
      resultArray.push({
        ruleId: ruleResult.id,
        level: level,
        message: this._convertMessage(node, level),
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

  private _getPartialFingerprintsFromRule(ruleResult: IChiselRuleResult): IDictionaryStringTo<string> {
    return {
      ruleId: ruleResult.id
    };
  }

  private _convertMessage(node: AxeNodeResult, level: CustomSarif.Result.level): CustomSarif.Message {
    const textArray: string[] = [];
    const richTextArray: string[] = [];

    if (level === CustomSarif.Result.level.error) {
      const allAndNone = node.all.concat(node.none);
      this._convertMessageChecks('Fix all of the following:', allAndNone, textArray, richTextArray);
      this._convertMessageChecks('Fix any of the following:', node.any, textArray, richTextArray);
    } else {
      const allNodes = node.all.concat(node.none).concat(node.any);
      this._convertMessageChecks('The following tests passed:', allNodes, textArray, richTextArray);
    }

    return {
      text: textArray.join(' '),
      richText: richTextArray.join('\n\n')
    };
  }

  private _convertMessageChecks(heading: string, checkResults: FormattedCheckResult[], textArray: string[], richTextArray: string[]): void {
    if (checkResults.length > 0) {
      const textLines: string[] = [];
      const richTextLines: string[] = [];

      textLines.push(heading);
      richTextLines.push(this._escapeForMarkdown(heading));

      for (const checkResult of checkResults) {
        const message = StringUtils.isNotEmpty(checkResult.message) ? checkResult.message : checkResult.id;

        textLines.push(message + '.');
        richTextLines.push('- ' + this._escapeForMarkdown(message));
      }

      textArray.push(textLines.join(' '));
      richTextArray.push(richTextLines.join('\n'));
    }
  }

  private _escapeForMarkdown(s: string): string {
    return s ? s.replace(/</g, '&lt;') : '';
  }

  private _convertRuleResultsWithoutNodes(
    resultArray: Sarif.Result[],
    ruleResults: IChiselRuleResult[],
    level: CustomSarif.Result.level,
    properties: IDictionaryStringTo<string>
  ): void {
    if (ruleResults) {
      for (const ruleResult of ruleResults) {
        const partialFingerprints = this._getPartialFingerprintsFromRule(ruleResult);
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

  private _convertResultsToRules(results: IChiselResults): IDictionaryStringTo<Sarif.Rule> {
    const rulesDictionary: IDictionaryStringTo<Sarif.Rule> = {};

    this._convertRuleResultsToRules(rulesDictionary, results.violations);
    this._convertRuleResultsToRules(rulesDictionary, results.passes);
    this._convertRuleResultsToRules(rulesDictionary, results.inapplicable);
    this._convertRuleResultsToRules(rulesDictionary, results.incomplete);

    return rulesDictionary;
  }

  private _convertRuleResultsToRules(rulesDictionary: IDictionaryStringTo<Sarif.Rule>, ruleResults: IChiselRuleResult[]): void {
    if (ruleResults) {
      for (const ruleResult of ruleResults) {
        this._convertRuleResultToRule(rulesDictionary, ruleResult);
      }
    }
  }

  private _convertRuleResultToRule(rulesDictionary: IDictionaryStringTo<Sarif.Rule>, ruleResult: IChiselRuleResult): void {
    if (!rulesDictionary.hasOwnProperty(ruleResult.id)) {
      const rule: Sarif.Rule = {
        id: ruleResult.id,
        name: {
          text: ruleResult.help
        },
        fullDescription: {
          text: ruleResult.description
        },
        helpUri: ruleResult.chiselHelpUrl,
        properties: {
          standards: this._convertStandardsForRule(ruleResult.MAS!)
        }
      };
      rulesDictionary[ruleResult.id] = rule;
    }
  }

  private _convertStandardsForRule(masList: IMas[]): string[] {
    const standards: string[] = [];
    if (masList !== undefined) {
      for (const mas of masList) {
        standards.push(mas.text);
      }
    }
    return standards;
  }

  private _convertStandards(): IDictionaryStringTo<KerosStandard> {
    const standards: IDictionaryStringTo<KerosStandard> = {};
    // tslint:disable-next-line:forin
    for (const key in this.masList) {
      const mas = this.masList[key];
      if (mas.title === undefined) {
        continue;
      }

      standards[mas.text] = {
        standardName: {
          text: 'MAS'
        },
        requirementName: {
          text: mas.title
        },
        requirementId: mas.text,
        requirementUri: mas.url!
      };
    }
    return standards;
  }
}

// tslint:disable-next-line:interface-name
export interface KerosStandard {
  standardName: CustomSarif.Message;
  requirementName: CustomSarif.Message;
  requirementId: string;
  requirementUri: string;
}
