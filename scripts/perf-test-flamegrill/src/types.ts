import * as React from 'react';
export interface Scenario {
  (): JSX.Element;
  decorator?: (props: { children: React.ReactNode }) => JSX.Element;
}

export type Scenarios = { [scenarioExportName: string]: Scenario };
