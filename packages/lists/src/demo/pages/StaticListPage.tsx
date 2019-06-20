import * as React from 'react';
import { ComponentPage, ExampleCard, Markdown } from '@uifabric/example-app-base';

import { StaticListExample } from '../../components/StaticList/examples/StaticList.Example';
import { StaticOrderedListExample } from '../../components/StaticList/examples/StaticOrderedList.Example';
import { StaticListTableExample } from '../../components/StaticList/examples/StaticTable.Example';
import { Toggle } from 'office-ui-fabric-react';

const StaticListExampleCode = require('!raw-loader!@uifabric/lists/src/components/StaticList/examples/StaticList.Example.tsx') as string;
const StaticOrderedListExampleCode = require('!raw-loader!@uifabric/lists/src/components/StaticList/examples/StaticOrderedList.Example.tsx') as string;
const StaticListTableExampleCode = require('!raw-loader!@uifabric/lists/src/components/StaticList/examples/StaticTable.Example.tsx') as string;

/* tslint:disable-next-line:no-any */
const Profiler = (React as any).unstable_Profiler;

export class StaticListPage extends React.PureComponent<{}, { enableProfiler: boolean }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      enableProfiler: false
    };
  }

  public render(): JSX.Element {
    const { enableProfiler } = this.state;

    return (
      <ComponentPage
        title="StaticList"
        componentName="StaticList examples"
        exampleCards={
          <>
            <Toggle onChange={this._onToggleProfiler} label={'Enable React profiler output to console'} />
            <ExampleCard title="StaticList example" code={StaticListExampleCode}>
              {enableProfiler ? (
                <Profiler id="StaticListExample" onRender={this._onRender}>
                  <StaticListExample />
                </Profiler>
              ) : (
                <StaticListExample />
              )}
            </ExampleCard>
            <ExampleCard title="StaticList ordered list" code={StaticOrderedListExampleCode}>
              {enableProfiler ? (
                <Profiler id="StaticOrderedListExample" onRender={this._onRender}>
                  <StaticOrderedListExample />
                </Profiler>
              ) : (
                <StaticOrderedListExample />
              )}
            </ExampleCard>
            <ExampleCard title="StaticList table" code={StaticListTableExampleCode}>
              {enableProfiler ? (
                <Profiler id="StaticListTableExample" onRender={this._onRender}>
                  <StaticListTableExample />
                </Profiler>
              ) : (
                <StaticListTableExample />
              )}
            </ExampleCard>
          </>
        }
        overview={<Markdown>{require<string>('!raw-loader!./docs/StaticListOverview.md')}</Markdown>}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Render a reasonable number of rows that do not degrade user-experience.</li>
              <li>Render content that is paginated either by prepending or appending rows.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Render large data sets with complex row DOM as it will likely result in a degraded user-experience.</li>
              <li>Rely on default index as key behavior if sorting or filtering row content.</li>
            </ul>
          </div>
        }
      />
    );
  }

  private _onToggleProfiler = (_event: React.MouseEvent<HTMLElement>, value: boolean | undefined): void => {
    this.setState({ enableProfiler: !!value });
  };

  private _onRender(id: string, phase: string, actualTime: number, baseTime: number, startTime: number, commitTime: number): void {
    console.table({ id, phase, actualTime, baseTime, startTime, commitTime });
  }
}
