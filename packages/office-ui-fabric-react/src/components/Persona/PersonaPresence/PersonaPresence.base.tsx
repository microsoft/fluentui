import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { Icon } from '../../../Icon';
import {
  IPersonaPresenceProps,
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize
} from '../Persona.types';
import { sizeBoolean } from '../PersonaConsts';

const coinSizeFontScaleFactor = 6;
const coinSizePresenceScaleFactor = 3;
const presenceMaxSize = 40;
const presenceFontMaxSize = 20;

const getClassNames = classNamesFunction<IPersonaPresenceStyleProps, IPersonaPresenceStyles>();

/**
 * PersonaPresence with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export class PersonaPresenceBase extends BaseComponent<IPersonaPresenceProps, {}> {
  constructor(props: IPersonaPresenceProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    const {
      coinSize,
      styles, // Use getStyles from props.
      presence,
      theme
    } = this.props;
    const size = sizeBoolean(this.props.size as PersonaSize);

    // Render Presence Icon if Persona is above size 32.
    const renderIcon =
      !(size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && (coinSize ? coinSize > 32 : true);

    const presenceHeightWidth: string = coinSize
      ? coinSize / coinSizePresenceScaleFactor < presenceMaxSize
        ? coinSize / coinSizePresenceScaleFactor + 'px'
        : presenceMaxSize + 'px'
      : '';
    const presenceFontSize: string = coinSize
      ? coinSize / coinSizeFontScaleFactor < presenceFontMaxSize
        ? coinSize / coinSizeFontScaleFactor + 'px'
        : presenceFontMaxSize + 'px'
      : '';
    const coinSizeWithPresenceIconStyle = coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth } : undefined;
    const coinSizeWithPresenceStyle = coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined;

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(styles, {
      theme: theme!,
      presence,
      size: this.props.size
    });

    if (presence === PersonaPresenceEnum.none) {
      return null;
    }

    return (
      <div className={classNames.presence} style={coinSizeWithPresenceStyle}>
        {renderIcon && this._onRenderIcon(classNames.presenceIcon, coinSizeWithPresenceIconStyle)}
      </div>
    );
  }

  private _onRenderIcon = (className?: string, style?: React.CSSProperties): JSX.Element => (
    <Icon className={className} iconName={this._determineIcon()} style={style} />
  );

  private _determineIcon = (): string | undefined => {
    const { presence } = this.props;

    if (presence !== PersonaPresenceEnum.none) {
      let userPresence = PersonaPresenceEnum[presence as PersonaPresenceEnum];

      switch (userPresence) {
        case 'online':
          userPresence = 'SkypeCheck';
          break;
        case 'away':
          userPresence = 'SkypeClock';
          break;
        case 'dnd':
          userPresence = 'SkypeMinus';
          break;
        default:
          userPresence = '';
      }

      return userPresence;
    }
  };
}
