import * as React from 'react';

export interface ISearchBoxProps {
}

export default class SearchBox extends React.Component<ISearchBoxProps, any> {
  public render() {
    let rootClass = 'ms-SearchBox';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}
