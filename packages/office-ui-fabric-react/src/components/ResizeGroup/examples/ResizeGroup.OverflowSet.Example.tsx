/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ResizeGroup, IResizeGroup } from '../../ResizeGroup';
import { OverflowSet } from '../../OverflowSet';

import * as stylesImport from './ResizeGroup.Example.scss';
const styles: any = stylesImport;

import { data } from './data';

export class ResizeGroupOverflowSetExample extends BaseComponent<any, any> {

  private _resizeGroup: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      short: false
    }
  }

  public render() {

    return (
      <div className={ this.state.short ? styles.resizeIsShort : 'notResized' }>
        <ResizeGroup

          ref={ this._resolveRef('_resizeGroup') }
          data={ data }
          onReduceData={ (currentdata) => {
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
                      icon={ item.icon }
                      onClick={ item.onClick }
                    />
                  );
                } }
                onRenderOverflowButton={ (props) => {
                  return (
                    <DefaultButton
                      menuProps={ props.menuProps }
                    />
                  );
                }
                }
              />
            );
          } }
        />
        <DefaultButton text='resize' onClick={ () => this._addClass() } />
        <DefaultButton text='remeasure' onClick={ this._resizeGroup.measure() } />
      </div>
    );
  };

  private _addClass = () => {
    this.setState({
      short: true
    });
  }
}