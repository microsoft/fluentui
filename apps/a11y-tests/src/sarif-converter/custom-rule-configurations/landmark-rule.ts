import { IKerosRuleConfiguration } from '../iruleresults';

const landmarkCheckId: string = 'unique-landmark';

export const landmarkConfiguration: IKerosRuleConfiguration = {
  checks: [],
  rule: {
    id: 'main-landmark',
    selector: '[role=main], main',
    any: [landmarkCheckId],
    enabled: false
  }
};
