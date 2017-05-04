import { Spinner } from './index';
import { SpinnerSize } from './Spinner.Props';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class SpinnerVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <div> <Spinner
        className='SpinnerExtraSmall'
        label='Spinner Extra Small'
        size={ SpinnerSize.xSmall }
      /></div>&nbsp;
      <div> <Spinner
        className='SpinnerSmall'
        label='Spinner Small'
        size={ SpinnerSize.small }
      /></div>&nbsp;
            <div> <Spinner
        className='SpinnerMedium'
        label='Spinner Medium'
        size={ SpinnerSize.medium }
      /></div>&nbsp;
            <div> <Spinner
        className='SpinnerLarge'
        label='Spinner Large'
        size={ SpinnerSize.large }
      /></div>&nbsp;
    </div>;
  }
}