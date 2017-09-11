import { TooltipHost } from './index';
import { DefaultButton } from '../Button/DefaultButton/DefaultButton';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class TooltipVPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <TooltipHost content='This is the tooltip' id='Tooltip' calloutProps={ { gapSpace: 25 } }>
          <DefaultButton id='TooltipButton' aria-describedby='myID'>Hover Over Me</DefaultButton>
        </TooltipHost>
      </div>
    );
  }
}
