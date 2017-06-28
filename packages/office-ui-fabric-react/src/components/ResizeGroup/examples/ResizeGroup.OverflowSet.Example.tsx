import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
import { OverflowSet } from '../../OverflowSet';

import styles from './ResizeGroup.Example.scss';
// const styles: any = stylesImport;

import { data } from './data';

export class ResizeGroupOverflowSetExample extends BaseComponent<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      short: false
    };
  }

  public render() {
    return (
      <div className={ this.state.short ? styles.resizeIsShort : 'notResized' }>
        <ResizeGroup
          data={ data }
          onReduceData={ (currentdata) => {
            if (currentdata.primary.length === 0) {
              return undefined;
            }

            let overflow = currentdata.overflow.concat(currentdata.primary.slice(-1));
            let primary = currentdata.primary.slice(0, -1);
            return { primary, overflow };
          } }
          onRenderData={ (data) => {
            return (
              <OverflowSet
                items={ data.primary }
                overflowItems={ data.overflow.length ? data.overflow : null }
                onRenderItem={ (item) => {
                  return (
                    <DefaultButton
                      text={ item.name }
                      iconProps={ { iconName: item.icon } }
                      onClick={ item.onClick }
                    />
                  );
                } }
                onRenderOverflowButton={ (overflowItems) => {
                  return (
                    <DefaultButton
                      menuProps={ { items: overflowItems } }
                    />
                  );
                } }
              />
            );
          } }
        />
      </div>
    );
  }
}