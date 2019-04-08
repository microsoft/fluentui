// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { RulesConfiguration } from '../ruleresults';

const landmarkCheckId: string = 'unique-landmark';

export const landmarkConfiguration: RulesConfiguration = {
  checks: [],
  rule: {
    id: 'main-landmark',
    selector: '[role=main], main',
    any: [landmarkCheckId],
    enabled: false
  }
};
