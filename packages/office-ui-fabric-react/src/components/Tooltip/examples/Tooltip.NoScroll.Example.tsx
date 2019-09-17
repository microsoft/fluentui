import * as React from 'react';
import { BaseComponent, getId } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

export class TooltipNoScrollExample extends BaseComponent<{}> {
  private readonly tooltipId = getId('text-tooltip');

  public render(): JSX.Element {
    return (
      <TooltipHost
        content="This is the tooltip"
        id={this.tooltipId}
        tooltipProps={{ style: { overflowY: 'auto' } }}
        styles={{ root: { display: 'inline-block' } }}
      >
        <DefaultButton aria-describedby={this.tooltipId}>Tooltip without scroll</DefaultButton>
      </TooltipHost>
    );
  }
}
