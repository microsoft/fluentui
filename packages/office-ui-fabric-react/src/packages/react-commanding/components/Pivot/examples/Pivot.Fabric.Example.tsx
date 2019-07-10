import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

export class PivotFabricExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Pivot linkFormat={PivotLinkFormat.links} linkSize={PivotLinkSize.normal}>
          <PivotItem headerText="Callout">
            <Label>Callout Example</Label>A
          </PivotItem>
          <PivotItem headerText="Spinner">
            <Label>Spinner Example</Label>B
          </PivotItem>
          <PivotItem headerText="Persona">
            <Label>Persona Example</Label>C
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
