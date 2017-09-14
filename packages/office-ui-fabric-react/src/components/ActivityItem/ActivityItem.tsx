/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles } from './ActivityItem.Props';
import { mergeStyles } from '../../Styling';
import { IActivityItemClassNames, getClassNames } from './ActivityItem.classNames';
import { getStyles } from './ActivityItem.styles';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { PersonaCoin } from 'office-ui-fabric-react/lib/PersonaCoin';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export class ActivityItem extends BaseComponent<IActivityItemProps, {}> {
  private _classNames: IActivityItemClassNames;
  private _styles: IActivityItemStyles;

  constructor(props: IActivityItemProps) {
    super(props);
  }

  public render() {
    let {
      onRenderIcon = this._onRenderIcon,
      onRenderActivityDescription = this._onRenderActivityDescription,
      onRenderComments = this._onRenderComments,
      onRenderTimeStamp = this._onRenderTimeStamp,
      styles: customStyles,
    } = this.props;

    this._styles = getStyles(undefined, customStyles);
    this._classNames = getClassNames(
      this._styles,
      this.props.className!,
      this.props.activityPersonas!,
      this.props.isCompact!
    );

    return (
      <div className={ this._classNames.root } style={ this.props.style } >

        { (this.props.onRenderIcon || this.props.activityPersonas) &&
          <div className={ this._classNames.activityTypeIcon }>
            { onRenderIcon(this.props, this._onRenderIcon) }
          </div>
        }

        <div className={ this._classNames.activityContent }>
          { onRenderActivityDescription(this.props, this._onRenderActivityDescription) }
          { onRenderComments(this.props, this._onRenderComments) }
          { onRenderTimeStamp(this.props, this._onRenderTimeStamp) }
        </div>

      </div>
    );
  }

  @autobind
  private _onRenderIcon(props: IActivityItemProps): JSX.Element | null {
    if (props.activityPersonas) {
      return this._onRenderPersonaArray(props);
    }

    return null;
  }

  @autobind
  private _onRenderActivityDescription(props: IActivityItemProps): JSX.Element | null {
    if (props.activityDescriptionText) {
      return (<span className={ this._classNames.activityText }>{ props.activityDescriptionText }</span>);
    }

    return null;
  }

  @autobind
  private _onRenderComments(props: IActivityItemProps): JSX.Element | null {
    if (!props.isCompact && props.commentText) {
      return (<div className={ this._classNames.commentText }>{ props.commentText }</div>);
    }

    return null;
  }

  @autobind
  private _onRenderTimeStamp(props: IActivityItemProps): JSX.Element | null {
    if (!props.isCompact && props.timeStamp) {
      return (<div className={ this._classNames.timeStamp }>{ props.timeStamp }</div>);
    }

    return null;
  }

  // If activityPersonas is an array of persona props, build the persona cluster element.
  @autobind
  private _onRenderPersonaArray(props: IActivityItemProps): JSX.Element | null {
    let personaElement: JSX.Element | null = null;
    let activityPersonas = props.activityPersonas as Array<IPersonaProps & { key?: string | number }>;
    if (activityPersonas[0].imageUrl || activityPersonas[0].imageInitials) {
      let personaList: Array<JSX.Element> = [];
      let showSize16Personas = (activityPersonas.length > 1 || props.isCompact);
      let personaLimit = props.isCompact ? 3 : 4;
      let style: React.CSSProperties | undefined = undefined;
      if (props.isCompact) {
        style = {
          display: 'inline-block',
          width: '8px',
          minWidth: '8px',
          overflow: 'visible'
        };
      }
      activityPersonas.filter((person, index) => index < personaLimit).forEach((person, index) => {
        personaList.push(
          <PersonaCoin
            {...person}
            // tslint:disable-next-line:no-string-literal
            key={ person['key'] ? person['key'] : index }
            className={ this._classNames.activityPersona }
            size={ showSize16Personas ? PersonaSize.size16 : PersonaSize.extraSmall }
            style={ style }
          />
        );
      });
      personaElement = <div className={ this._classNames.personaContainer }>{ personaList }</div>;
    }
    return personaElement;
  }

}