import { IKerosRuleConfiguration } from '../iruleresults';

const colorCheckId: string = 'select-body';

export const colorConfiguration: IKerosRuleConfiguration = {
  checks: [
    {
      id: colorCheckId,
      evaluate: () => true
    }
  ],
  rule: {
    id: 'select-body',
    selector: 'body',
    any: [colorCheckId],
    matches: () => isInTopWindow(window),
    enabled: false
  }
};

export function isInTopWindow(win: any) {
  return win.top === win;
}
