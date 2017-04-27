import { Tooltip } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class TooltipVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <Tooltip id='Tooltip' content='This is the tooltip'>Hover over me
      </Tooltip>
    </div>;
  }
}