import * as React from 'react';
import SearchBox from '../../../components/searchBox/SearchBox';

export default class SearchBoxExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='SearchBoxExample'>
        <h1>SearchBox</h1>
        <SearchBox />
      </div>
    );
  }

}
