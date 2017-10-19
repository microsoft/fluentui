import * as React from 'react';
import {
  autobind,
  BaseComponent,
  buttonProperties,
  css,
  divProperties,
  getId,
  getNativeProps
} from '../../Utilities';
import {
  Facepile
} from './Facepile';
import {
  IFacepileProps,
  IFacepilePersona,
  OverflowButtonType
} from './Facepile.Props';
import {
  FocusZone,
  FocusZoneDirection
} from '../../FocusZone';
import {
  BaseButton,
  DefaultButton
} from '../../Button';
import {
  Icon
} from '../../Icon';
import {
  PersonaCoin,
  PersonaSize
} from '../../PersonaCoin';
import {
  ResizeGroup
} from '../../ResizeGroup';
import * as stylesImport from './Facepile.scss';
const styles: any = stylesImport;

interface IOverflowData {
  props: IFacepileProps;
  primary: IFacepilePersona[];
  overflow: IFacepilePersona[];
  cacheKey?: string;
}

export interface IFacepileResponsiveProps extends IFacepileProps {
  /**
   * Set number of pixel to use for width instead of calculating it internally.
   */
  width?: number;
}

export class FacepileResponsive extends BaseComponent<IFacepileResponsiveProps, {}> {
  public static defaultProps: IFacepileResponsiveProps = {
    maxDisplayablePersonas: 5,
    personas: [],
    personaSize: PersonaSize.extraSmall
  };

  public render(): JSX.Element {
    let {
      ariaDescription,
      chevronButtonProps,
      maxDisplayablePersonas,
      overflowButtonProps,
      overflowButtonType,
      className,
      personas,
      showAddButton,
      width
    } = this.props;

    let facepileWrapperProps = {
      width: width ? `${width}px` : 'auto'
    };

    let numPersonasToShow: number = Math.min(personas.length, maxDisplayablePersonas || personas.length);

    let facepileData: IOverflowData = {
      props: this.props,
      primary: personas.slice(0, numPersonasToShow),
      overflow: personas.slice(numPersonasToShow)
    };

    return (
      <div style={ { ...facepileWrapperProps } }>
        <ResizeGroup
          className={ className }
          data={ facepileData }
          onReduceData={ this._showLess }
          onGrowData={ this._showMore }
          onRenderData={ (data: IOverflowData) => {
            return (
              <Facepile {...this.props}
                maxDisplayablePersonas={ data.primary.length }
                personas={ personas }
              />
            );
          } }
        />
      </div>
    );
  }

  @autobind
  private _showLess(currentData: any): any {
    if (currentData.primary.length === 0) {
      return undefined;
    }

    let overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
    let primary = currentData.primary.slice(0, -1);

    let cacheKey: string = this._computeCacheKey(primary);

    return { primary, overflow, cacheKey };
  }

  @autobind
  private _showMore(currentData: any): any {
    if (currentData.overflow.length === 0) {
      return undefined;
    }

    let overflow = currentData.overflow.slice(1);
    let primary = [...currentData.primary, ...currentData.overflow.slice(0, 1)];

    let cacheKey: string = this._computeCacheKey(primary);

    return { primary, overflow, cacheKey };
  }

  private _computeCacheKey(primaryControls: IFacepilePersona[]): string {
    return primaryControls
      .reduce((acc, current) => acc + current.personaName, '|')
      + `|${this.props.overflowButtonType}`;
  }
}