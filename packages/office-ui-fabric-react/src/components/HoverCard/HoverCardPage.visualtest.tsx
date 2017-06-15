import { HoverCardHost } from './index';
import { DefaultButton } from '../Button/DefaultButton/DefaultButton';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class HoverCardVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <HoverCardHost content='This is the tooltip' id='HoverCard'>
        <DefaultButton id='HoverCardButton' aria-describedby='myID'>Hover Over Me</DefaultButton>
      </HoverCardHost>
    </div>;
  }
}