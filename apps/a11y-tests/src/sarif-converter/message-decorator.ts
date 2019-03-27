import { CheckMessageTransformer } from './check-message-transformer';
import { AxeRule, IKerosRuleConfiguration } from './iruleresults';

export class MessageDecorator {
  private configuration: IKerosRuleConfiguration[];
  private checkMessageCreator: CheckMessageTransformer;
  constructor(configuration: IKerosRuleConfiguration[], checkMessageCreator: CheckMessageTransformer) {
    this.configuration = configuration;
    this.checkMessageCreator = checkMessageCreator;
  }

  public decorateResultWithMessages(results: AxeRule): void {
    const ruleConfiguration = this.configuration.filter(config => config.rule.id === results.id).pop();

    if (ruleConfiguration === undefined) {
      return;
    }

    results.description = ruleConfiguration.rule.description!;
    results.help = ruleConfiguration.rule.help;

    results.nodes.forEach(resultNode => {
      this.checkMessageCreator.addMessagesToChecks(resultNode.all, ruleConfiguration.checks);
      this.checkMessageCreator.addMessagesToChecks(resultNode.none, ruleConfiguration.checks);
      this.checkMessageCreator.addMessagesToChecks(resultNode.any, ruleConfiguration.checks);
      if (ruleConfiguration.rule.decorateNode) {
        ruleConfiguration.rule.decorateNode(resultNode);
      }
    });
  }
}
