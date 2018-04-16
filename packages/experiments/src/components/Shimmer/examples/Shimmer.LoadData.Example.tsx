import * as React from 'react';
import { Shimmer } from '@uifabric/experiments/lib/Shimmer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IShimmerLoadDataExample {
  isDataLoaded?: boolean;
}

export class ShimmerLoadDataExample extends React.Component<{}, IShimmerLoadDataExample> {

  constructor(props: {}) {
    super(props);
    this.state = {
      isDataLoaded: false
    };
  }

  public render(): JSX.Element {
    const {
      isDataLoaded: dataLoaded,
    } = this.state;

    return (
      // tslint:disable-next-line:jsx-ban-props
      <div style={ { padding: '2px' } }>
        <Shimmer
          isDataLoaded={ dataLoaded }
        >
          <div>Data Loaded Data Loaded Data Loaded Data Loaded Data Loaded Data Loaded Data Loaded</div>
        </Shimmer>
        <Toggle
          label='Load data switch'
          checked={ dataLoaded }
          // tslint:disable-next-line:jsx-no-lambda
          onChanged={ (isDataLoaded: boolean) => this.setState({ isDataLoaded }) }
          onText='Loaded'
          offText='Loading...'
        />
      </div>
    );
  }
}