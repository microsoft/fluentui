import * as React from 'react';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { IChicletCardProps, IChicletAction } from './ChicletCard.types';
import { ChicletCard } from './ChicletCard';

export class Chiclet extends React.Component<IChicletProps, IChicletCardProps> {
  public render() {
    const { chicletCardProps, size, actions } = this.props;

    var actionsToIChicletActionProps: IChicletAction[] = [];
    if (actions != null) {
      actions.forEach(function (string) {
        switch (string) {
          case "Breadcrumb":
            actionsToIChicletActionProps.push({ buttonProps: { iconProps: { iconName: 'Breadcrumb' } } });
            break;
          case "Save":
            actionsToIChicletActionProps.push({ buttonProps: { iconProps: { iconName: 'Save' } } });
            break;
          case "Share":
            actionsToIChicletActionProps.push({ buttonProps: { iconProps: { iconName: 'Share' } } });
            break;
          default:
            break;
        }
      });
    }

    switch (size) {
      case ChicletSize.medium:
        return (
          <ChicletCard {...chicletCardProps} onClick={ this._onClick } actions={ actionsToIChicletActionProps } />
        );
      // @todo: handle other types of chiclets
      default:
        return (
          <ChicletCard {...chicletCardProps} onClick={ this._onClick } actions={ actionsToIChicletActionProps } />
        );
    }
  }

  private _onClick(): void { // @todo: default click handler
    console.log("You clicked the Chiclet");
  }
}