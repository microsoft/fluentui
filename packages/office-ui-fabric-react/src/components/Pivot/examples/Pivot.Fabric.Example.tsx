import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {
  PivotLinkSize,
  PivotLinkFormat,
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

import { CalloutBasicExample } from '../../Callout/examples/Callout.Basic.Example';
import { SpinnerBasicExample } from '../../Spinner/examples/Spinner.Basic.Example';
import { PersonaBasicExample } from '../../Persona/examples/Persona.Basic.Example';

export class PivotFabricExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkFormat={ PivotLinkFormat.links } linkSize={ PivotLinkSize.normal }>
          <PivotItem linkText='Callout'>
            <Label>Callout Example</Label>
            <CalloutBasicExample />
          </PivotItem>
          <PivotItem linkText='Spinner'>
            <Label>Spinner Example</Label>
            <SpinnerBasicExample />
          </PivotItem>
          <PivotItem linkText='Persona'>
            <Label>Persona Example</Label>
            <PersonaBasicExample />
          </PivotItem>
        </Pivot>
      </div>
    );
  }

}
