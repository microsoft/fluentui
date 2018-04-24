import * as React from 'react';
import {
  css
} from '../../Utilities';
import {
  getClassNames
} from './Chiclet.styles';
import { IChicletProps, IChicletCardProps, IChicletStyles } from './Chiclet.types';
import { mergeStyles } from '../../Styling';
import { ChicletCard } from './ChicletCard';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as stylesImport from './Chiclet.scss';
const styles: any = stylesImport;

export class Chiclet extends React.Component<IChicletProps, IChicletCardProps> {
  private _classNames: IChicletStyles = {};

  public render() {
    const { styles: customStyles, chicletCardProps, size, actions, theme } = this.props;
    this._classNames = getClassNames(theme!, customStyles);

    var actionsToIButtonProps: IButtonProps[] = [];
    if (actions != null) {
      actions.forEach(function (string) {
        switch (string) {
          case "Breadcrumb":
            actionsToIButtonProps.push({ iconProps: { iconName: 'Breadcrumb' } });
            break;
          case "Save":
            actionsToIButtonProps.push({ iconProps: { iconName: 'Save' } });
            break;
          case "Share":
            actionsToIButtonProps.push({ iconProps: { iconName: 'Share' } });
            break;
          default:
            break;
        }
      });
    }

    switch (size) {
      case "xsmall":
        return (
          <ChicletCard {...chicletCardProps} className={ mergeStyles(this._classNames.root) } onClick={ this._onClick } actions={ actionsToIButtonProps } />
        );
      case "small":
        return (
          <ChicletCard {...chicletCardProps} className={ mergeStyles(this._classNames.root) } onClick={ this._onClick } actions={ actionsToIButtonProps } />
        );
      case "medium":
      case "large":
      case "xlarge":
        return (
          <ChicletCard {...chicletCardProps} className={ mergeStyles(this._classNames.root) } onClick={ this._onClick } actions={ actionsToIButtonProps } />
        );
      default:
        return (
          <ChicletCard {...chicletCardProps} className={ mergeStyles(this._classNames.root) } onClick={ this._onClick } actions={ actionsToIButtonProps } />
        );
    }
  }

  private _onClick(): void {
    console.log("You clicked the Chiclet");
  }
}