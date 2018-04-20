import * as React from 'react';
import {
  css
} from '../../Utilities';
import { IChicletPickerProps, IChicletCardProps } from './Chiclet.types';
import { ChicletCard } from './ChicletCard';
import * as stylesImport from './Chiclet.scss';
const styles: any = stylesImport;

export class ChicletPicker extends React.Component<IChicletPickerProps, IChicletCardProps> {
  public render() {
    const { chicletCardProps, size, actions } = this.props;

    switch (size) {
      case "xsmall":
        return (
          <ChicletCard {...chicletCardProps} className={ css(styles.root) } onClick={ this._onClick } actions={ actions } />
        );
      case "small":
        return (
          <ChicletCard {...chicletCardProps} className={ css(styles.root) } onClick={ this._onClick } actions={ actions } />
        );
      case "medium":
      case "large":
      case "xlarge":
        return (
          <ChicletCard {...chicletCardProps} className={ css(styles.root) } onClick={ this._onClick } actions={ actions } />
        );
      default:
        return (
          <ChicletCard {...chicletCardProps} className={ css(styles.root) } onClick={ this._onClick } actions={ actions } />
        );
    }
  }

  private _onClick(): void {
    console.log("You clicked the Chiclet");
  }
}