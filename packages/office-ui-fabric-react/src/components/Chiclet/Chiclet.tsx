import * as React from 'react';
import { IChicletProps } from './Chiclet.types';
import {
  BaseComponent,
  KeyCodes,
  css,
  styled
} from '../../Utilities';
import * as stylesImport from './Chiclet.scss';
const styles: any = stylesImport;

export class Chiclet extends BaseComponent<IChicletProps, any> {
  public static defaultProps: IChicletProps = {};

  constructor(props: IChicletProps) {
    super(props);
  }

  public render() {
    const { children } = this.props;

    return (
      <div>
        <p>hello!!!</p>
        { children }
      </div>
    );
  }

}
