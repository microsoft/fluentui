import * as React from 'react';
import { default as Spinner, SpinnerType } from '../../../../../components/Spinner/index';
import Label from '../../../../../components/Label/index';
import './BasicSpinner.Example.scss';

export default class BasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSpinnersExample'>
        <Label>Normal Spinner</Label>
        <Spinner />

        <Label>Large Spinner</Label>
        <Spinner type={ SpinnerType.large }/>

        <Label>Spinner With Label</Label>
        <Spinner label="Loading..." />

        <Label>Large Spinner With Label</Label>
        <Spinner type={ SpinnerType.large } label="Loading..."/>
      </div>
    );
  }
}