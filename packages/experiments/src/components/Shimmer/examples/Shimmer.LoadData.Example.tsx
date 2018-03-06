import * as React from 'react';
import { Shimmer } from 'experiments/lib/Shimmer';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export class ShimmerLoadDataExample extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isDataLoaded: false
    };
  }

  public render() {
    const {
      isDataLoaded: dataLoaded,
    } = this.state;

    return (
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
          onChanged={ isDataLoaded => this.setState({ isDataLoaded }) }
          onText='Loaded'
          offText='Loading...'
        />
      </div>
    );
  }
}