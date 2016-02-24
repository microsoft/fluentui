import * as React from 'react';

export interface ISearchBoxProps {
}

export default class SearchBox extends React.Component<ISearchBoxProps, any> {
  render() {
    let rootClass = 'ms-SearchBox';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}