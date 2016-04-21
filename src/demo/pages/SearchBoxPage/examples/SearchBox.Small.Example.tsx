import * as React from 'react';
import {
  SearchBox
} from '../../../../components/index';
import './SearchBox.Small.Example.scss';

export default class SearchBoxSmallExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-SearchBoxSmallExample'>
        <SearchBox />
      </div>
    );
  }

}
