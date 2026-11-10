/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
export interface Scenario {
  (): React.ReactElement<any, any>;
  decorator?: (props: { children: React.ReactNode }) => React.ReactElement<any, any>;
}

export type Scenarios = { [scenarioExportName: string]: Scenario };
