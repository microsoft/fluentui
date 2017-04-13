/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  OverflowSet
} from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';

import { items } from './items';

export class ResizeGroupOverflowSetExample extends BaseComponent<any, any> {

  public render() {
    return (
      <ResizeGroup
        items={ items }
        onReduceItems={ (currentItems, props) => {
          let overflow = currentItems[0].overflow.concat(currentItems[0].primary.slice(-1));
          let primary = currentItems[0].primary.slice(0, -1);

          return [{ primary, overflow }];
        } }
        onRenderItems={ (items) => {
          return (
            <OverflowSet
              items={ items[0].primary }
              overflowItems={ items[0].overflow.length ? items[0].overflow : null }
              onRenderItem={ (item) => {
                return (
                  <DefaultButton
                    text={ item.name }
                    icon={ item.icon }
                    onClick={ item.onClick }
                  />
                );
              } }
            />
          );
        } }
      />
    );
  };
}