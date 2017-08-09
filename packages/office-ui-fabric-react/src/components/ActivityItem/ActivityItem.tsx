/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { autobind, BaseComponent, memoize } from '../../Utilities';
import { IActivityItemProps, IActivityItemStyles } from './ActivityItem.Props';
import { mergeStyles } from '../../Styling';
import { getStyles } from './ActivityItem.styles';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export interface IActivityItemClassNames {
  root?: string;
  activityContent?: string;
  activityText?: string;
  personaContainer?: string;
  activityPersona?: string;
  activityTypeIcon?: string;
  commentText?: string;
  timeStamp?: string;
}

export class ActivityItem extends BaseComponent<IActivityItemProps, {}> {
  private _classNames: IActivityItemClassNames;
  private _styles: IActivityItemStyles;

  constructor(props: IActivityItemProps) {
    super(props);
  }

  public render() {
    let {
      className,
      styles: customStyles,
    } = this.props;

    this._styles = getStyles(undefined, customStyles);
    this._classNames = this._getClassNames(
      this._styles,
      this.props.className!,
      this.props.activityPersonas!,
      this.props.isCompact!
    );

    return (
      <div className={ this._classNames.root } style={ this.props.style } >

        { (this.props.activityPersonas || this.props.activityIcon) &&
          <div className={ this._classNames.activityTypeIcon }>
            { this.props.activityPersonas ? this._onRenderPersonaArray(this.props) : this.props.activityIcon }
          </div>
        }

        <div className={ this._classNames.activityContent }>
          { this.props.activityDescription &&
            <span className={ this._classNames.activityText }>{ this.props.activityDescription }</span>
          }
          { !this.props.isCompact && this.props.comments &&
            <div className={ this._classNames.commentText }>{ this.props.comments }</div>
          }
          { !this.props.isCompact && this.props.timeStamp &&
            <div className={ this._classNames.timeStamp }>{ this.props.timeStamp }</div>
          }
        </div>

      </div>
    );
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
          <Persona
            {...person}
            // tslint:disable-next-line:no-string-literal
            key={ person['key'] ? person['key'] : index }
            className={ this._classNames.activityPersona }
            size={ showSize16Personas ? PersonaSize.size16 : PersonaSize.extraSmall }
            hidePersonaDetails={ true }
            style={ style } />
        );
      });
      personaElement = <div className={ this._classNames.personaContainer }>{ personaList }</div>;
    }
    return personaElement;
  }

  // Determine what classNames each element needs
  @memoize
  private _getClassNames(styles: IActivityItemStyles, className: string, activityPersonas: Array<IPersonaProps>, isCompact: boolean): IActivityItemClassNames {
    return {
      root: mergeStyles(
        'ms-ActivityItem',
        styles.root,
        className,
        isCompact && styles.isCompactRoot
      ) as string,

      personaContainer: mergeStyles(
        'ms-ActivityItem-personaContainer',
        styles.personaContainer,
        isCompact && styles.isCompactPersonaContainer
      ) as string,

      activityPersona: mergeStyles(
        'ms-ActivityItem-activityPersona',
        styles.activityPersona,
        isCompact && styles.isCompactPersona,
        !isCompact && activityPersonas && activityPersonas.length === 2 && styles.doublePersona
      ) as string,

      activityTypeIcon: mergeStyles(
        'ms-ActivityItem-activityTypeIcon',
        styles.activityTypeIcon,
        isCompact && styles.isCompactIcon
      ) as string,

      activityContent: mergeStyles(
        'ms-ActivityItem-activityContent',
        styles.activityContent,
        isCompact && styles.isCompactContent
      ) as string,

      activityText: mergeStyles('ms-ActivityItem-activityText', styles.activityText) as string,
      commentText: mergeStyles('ms-ActivityItem-commentText', styles.commentText) as string,
      timeStamp: mergeStyles('ms-ActivityItem-timeStamp', styles.timeStamp) as string
    };
  }
}