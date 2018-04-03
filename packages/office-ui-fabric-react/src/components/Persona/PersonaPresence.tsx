import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  styled,
} from '../../Utilities';
import { IStyleSet } from '../../Styling';
import { Icon } from '../../Icon';
import {
  IPersonaPresenceProps,
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize,
} from './Persona.types';
import { sizeBoolean } from './PersonaConsts';
import { getStyles } from './PersonaPresence.styles';

const coinSizeFontScaleFactor = 6;
const coinSizePresenceScaleFactor = 3;
const presenceMaxSize = 40;
const presenceFontMaxSize = 20;

const getClassNames = classNamesFunction<IPersonaPresenceStyleProps, IPersonaPresenceStyles>();

// Export themeable PersonaPresenceBase
@customizable('PersonaPresence', ['theme'])
export class PersonaPresenceBase extends BaseComponent<IPersonaPresenceProps, {}> {
  constructor(props: IPersonaPresenceProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    const {
      coinSize,
      getStyles: getStylesProp, // Use getStyles from props.
      presence,
      theme,
    } = this.props;
    const size = sizeBoolean(this.props.size as PersonaSize);

    // Render Presence Icon if Persona is above size 32.
    const renderIcon = this.props.showIcon || !(size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && (coinSize ? coinSize > 32 : true);

    const presenceHeightWidth: string = coinSize ? (coinSize / coinSizePresenceScaleFactor < presenceMaxSize ? coinSize / coinSizePresenceScaleFactor + 'px' : presenceMaxSize + 'px') : '';
    const presenceFontSize: string = coinSize ? (coinSize / coinSizeFontScaleFactor < presenceFontMaxSize ? coinSize / coinSizeFontScaleFactor + 'px' : presenceFontMaxSize + 'px') : '';
    const coinSizeWithPresenceIconStyle = coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth } : undefined;
    const coinSizeWithPresenceStyle = coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined;

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(getStylesProp || getStyles, {
      theme: theme!,
      presence,
      size: this.props.size,
    });

    if (presence === PersonaPresenceEnum.none) {
      return null;
    }

    return (
      <div
        className={ classNames.presence }
        style={ coinSizeWithPresenceStyle }
      >
        <Icon
          className={ classNames.presenceIcon }
          iconName={ this._determineIcon() }
          style={ coinSizeWithPresenceIconStyle }
        />
      </div>
    );
  }

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
  }
}

// Export Styled PersonaPresence
export const PersonaPresence = styled<IPersonaPresenceProps, IPersonaPresenceStyleProps, IPersonaPresenceStyles>(
  PersonaPresenceBase,
  getStyles
);
