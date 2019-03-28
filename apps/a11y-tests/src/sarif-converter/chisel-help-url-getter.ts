import { IKerosRuleConfiguration } from './iruleresults';

export class ChiselHelpUrlGetter {
  constructor(private readonly ruleConfigs: IKerosRuleConfiguration[]) {}

  public getChiselHelpUrl(ruleId: string): string {
    const customHelpUrl = this._getCustomHelpUrl(ruleId);
    return customHelpUrl || `https://aka.ms/keros/rules/axe.${ruleId}`;
  }

  private _getCustomHelpUrl(ruleId: string): string {
    for (let index = 0; index < this.ruleConfigs.length; index++) {
      const config = this.ruleConfigs[index];
      if (config.rule.id === ruleId && config.rule.helpUrl !== undefined) {
        return config.rule.helpUrl;
      }
    }

    return '';
  }
}
