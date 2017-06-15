/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  autobind
  // css
  // getId
} from '../../Utilities';
import { IScrollablePaneProps } from './ScrollablePane.Props';
import * as stylesImport from './ScrollablePane.scss';
const styles: any = stylesImport;

export interface IScrollablePaneState {
  contentAreasAbove: JSX.Element[];
  contentAreasVisible: JSX.Element[];
  contentAreasBelow: JSX.Element[];
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> {

  public static defaultProps: IScrollablePaneProps = {
  };

  constructor(props: IScrollablePaneProps) {
    super(props);

    this.state = {
      contentAreasAbove: [],
      contentAreasVisible: [],
      contentAreasBelow: []
    };
  }

  public componentDidMount() {
    console.log('mount');
  }

  @autobind
  public componentWillReceiveProps(newProps: IScrollablePaneProps) {
    console.log('receive props');
  }

  public render() {
    return (
      <div>
        scrollable pane
      </div>
    );
  }
}
