/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  OverflowGroup
} from 'office-ui-fabric-react/lib/OverflowGroup';
import { items } from './items';

export class OverflowGroupBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <div>
        <OverflowGroup
          items={ items }
          onRenderItem={ (item, i) => {
            return (
              <DefaultButton
                text={ item.name }
                icon={ item.icon }
                onClick={ item.onClick }
                contextualMenuItems={ item.subMenuProps ? item.subMenuProps.items : null }
              >
              </DefaultButton>
            );
          } }
        >
        </OverflowGroup>
      </div>
    );
  }
}