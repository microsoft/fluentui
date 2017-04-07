/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css } from 'office-ui-fabric-react/lib/Utilities';
import { Button } from 'office-ui-fabric-react/lib/Button';
import {
  TooltipHost
} from 'office-ui-fabric-react/lib/Tooltip';
import "./Tooltip.Overflow.Example.scss";

/*

Styles are defined as

 .example-host {
    border: 1px solid black;
    display: block;
  }

  .hide-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    max-width: 200px;
  }

the overflow need to occur withing the TooltipHost (which is rendered as a div).

*/

export class TooltipOverflowExample extends BaseComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      overflow: false
    };
  }

  public render() {
    return (
      <div>
        <Button onClick={ () => this.setState({ overflow: !this.state.overflow }) }>Toggle showing overflow</Button>

        <p>
          <TooltipHost content='This is the tooltip' id='myID' hostClassName={ css('example-host', {
            'hide-overflow': this.state.overflow
          }) } onlyShowIfOverflow={ true }>
            <span aria-describedby='myID'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat lectus ut magna sodales, sit amet accumsan arcu accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </TooltipHost>
        </p>
      </div>
    );
  }
}