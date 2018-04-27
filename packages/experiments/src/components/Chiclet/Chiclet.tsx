import * as React from 'react';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { IChicletCardProps } from './ChicletCard.types';
import { ChicletCard } from './ChicletCard';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class Chiclet extends React.Component<IChicletProps, IChicletCardProps> {
  public render() {
    const { chicletCardProps, size, actions } = this.props;

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
      case ChicletSize.medium:
        return (
          <ChicletCard {...chicletCardProps} onClick={ this._onClick } actions={ actionsToIButtonProps } />
        );
      // @todo: handle other types of chiclets
      default:
        return (
          <ChicletCard {...chicletCardProps} onClick={ this._onClick } actions={ actionsToIButtonProps } />
        );
    }
  }

  private _onClick(): void { // @todo: default click handler
    console.log("You clicked the Chiclet");
  }
}