import * as React from 'react';

export interface IOrgChartProps {
}

export default class OrgChart extends React.Component<IOrgChartProps, any> {
  public render() {
    let rootClass = 'ms-OrgChart';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}
