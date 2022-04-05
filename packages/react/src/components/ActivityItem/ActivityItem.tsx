import * as React from 'react';
import { getClassNames } from './ActivityItem.classNames';
import { getStyles } from './ActivityItem.styles';
import { PersonaSize, PersonaCoin } from '../../Persona';
import type { IActivityItemProps } from './ActivityItem.types';
import type { IActivityItemClassNames } from './ActivityItem.classNames';
import type { IPersonaSharedProps, IPersonaCoinProps } from '../../Persona';

type OptionalReactKey = { key?: React.Key };

/**
 * {@docCategory ActivityItem}
 */
export class ActivityItem extends React.Component<IActivityItemProps, {}> {
  constructor(props: IActivityItemProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      onRenderIcon = this._onRenderIcon,
      onRenderActivityDescription = this._onRenderActivityDescription,
      onRenderComments = this._onRenderComments,
      onRenderTimeStamp = this._onRenderTimeStamp,
      animateBeaconSignal,
      isCompact,
    } = this.props;

    const classNames = this._getClassNames(this.props);

    return (
      <div className={classNames.root} style={this.props.style}>
        {(this.props.activityPersonas || this.props.activityIcon || this.props.onRenderIcon) && (
          <div className={classNames.activityTypeIcon}>
            {animateBeaconSignal && isCompact && <div className={classNames.pulsingBeacon} />}
            {onRenderIcon(this.props)}
          </div>
        )}

        <div className={classNames.activityContent}>
          {onRenderActivityDescription(this.props, this._onRenderActivityDescription)}
          {onRenderComments(this.props, this._onRenderComments)}
          {onRenderTimeStamp(this.props, this._onRenderTimeStamp)}
        </div>
      </div>
    );
  }

  private _onRenderIcon = (props: IActivityItemProps): JSX.Element | React.ReactNode | null => {
    if (props.activityPersonas) {
      return this._onRenderPersonaArray(props);
    } else {
      return this.props.activityIcon;
    }
  };

  private _onRenderActivityDescription = (props: IActivityItemProps): JSX.Element | null => {
    const classNames = this._getClassNames(props);

    // eslint-disable-next-line deprecation/deprecation
    const activityDescription = props.activityDescription || props.activityDescriptionText;

    if (activityDescription) {
      return <span className={classNames.activityText}>{activityDescription}</span>;
    }

    return null;
  };

  private _onRenderComments = (props: IActivityItemProps): JSX.Element | null => {
    const classNames = this._getClassNames(props);

    // eslint-disable-next-line deprecation/deprecation
    const comments = props.comments || props.commentText;

    if (!props.isCompact && comments) {
      return <div className={classNames.commentText}>{comments}</div>;
    }

    return null;
  };

  private _onRenderTimeStamp = (props: IActivityItemProps): JSX.Element | null => {
    const classNames = this._getClassNames(props);

    if (!props.isCompact && props.timeStamp) {
      return <div className={classNames.timeStamp}>{props.timeStamp}</div>;
    }

    return null;
  };

  // If activityPersonas is an array of persona props, build the persona cluster element.
  private _onRenderPersonaArray = (props: IActivityItemProps): JSX.Element | null => {
    const classNames = this._getClassNames(props);

    let personaElement: JSX.Element | null = null;
    const activityPersonas = props.activityPersonas as Array<IPersonaSharedProps & OptionalReactKey>;
    if (activityPersonas[0].imageUrl || activityPersonas[0].imageInitials) {
      const personaList: Array<JSX.Element> = [];
      const showSize16Personas = activityPersonas.length > 1 || props.isCompact;
      const personaLimit = props.isCompact ? 3 : 4;
      let style: React.CSSProperties | undefined = undefined;
      if (props.isCompact) {
        style = {
          display: 'inline-block',
          width: '10px',
          minWidth: '10px',
          overflow: 'visible',
        };
      }
      activityPersonas
        .filter((person: IPersonaCoinProps & OptionalReactKey, index: number) => index < personaLimit)
        .forEach((person: IPersonaCoinProps & OptionalReactKey, index: number) => {
          personaList.push(
            <PersonaCoin
              {...person}
              key={person.key || index}
              className={classNames.activityPersona}
              // eslint-disable-next-line deprecation/deprecation
              size={showSize16Personas ? PersonaSize.size16 : PersonaSize.size32}
              style={style}
            />,
          );
        });
      personaElement = <div className={classNames.personaContainer}>{personaList}</div>;
    }
    return personaElement;
  };

  private _getClassNames(props: IActivityItemProps): IActivityItemClassNames {
    return getClassNames(
      getStyles(
        undefined,
        props.styles,
        props.animateBeaconSignal,
        props.beaconColorOne,
        props.beaconColorTwo,
        props.isCompact,
      ),
      props.className!,
      props.activityPersonas!,
      props.isCompact!,
    );
  }
}
