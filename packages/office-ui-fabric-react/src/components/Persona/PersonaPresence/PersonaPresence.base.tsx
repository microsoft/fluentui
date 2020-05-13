import * as React from 'react';
import { classNamesFunction } from '../../../Utilities';
import { Icon } from '../../../Icon';
import {
  IPersonaPresenceProps,
  IPersonaPresenceStyleProps,
  IPersonaPresenceStyles,
  PersonaPresence as PersonaPresenceEnum,
  PersonaSize,
} from '../Persona.types';
import { sizeBoolean } from '../PersonaConsts';

const coinSizeFontScaleFactor = 6;
const coinSizePresenceScaleFactor = 3;
const presenceMaxSize = 40;
const presenceFontMaxSize = 20;

const getClassNames = classNamesFunction<IPersonaPresenceStyleProps, IPersonaPresenceStyles>({
  // There can be many PersonaPresence rendered with different sizes.
  // Therefore setting a larger cache size.
  cacheSize: 100,
});

/**
 * PersonaPresence with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export class PersonaPresenceBase extends React.Component<IPersonaPresenceProps, {}> {
  constructor(props: IPersonaPresenceProps) {
    super(props);
  }

  public render(): JSX.Element | null {
    const {
      coinSize,
      isOutOfOffice,
      styles, // Use getStyles from props.
      presence,
      theme,
      presenceTitle,
      presenceColors,
    } = this.props;
    const size = sizeBoolean(this.props.size as PersonaSize);

    // Render Presence Icon if Persona is above size 32.
    const renderIcon =
      !(size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) &&
      (coinSize ? coinSize > 32 : true);

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
    const coinSizeWithPresenceIconStyle = coinSize
      ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth }
      : undefined;
    const coinSizeWithPresenceStyle = coinSize
      ? { width: presenceHeightWidth, height: presenceHeightWidth }
      : undefined;

    // Use getStyles from props, or fall back to getStyles from styles file.
    const classNames = getClassNames(styles, {
      theme: theme!,
      presence,
      size: this.props.size,
      isOutOfOffice,
      presenceColors,
    });

    if (presence === PersonaPresenceEnum.none) {
      return null;
    }

    return (
      <div role="presentation" className={classNames.presence} style={coinSizeWithPresenceStyle} title={presenceTitle}>
        {renderIcon && this._onRenderIcon(classNames.presenceIcon, coinSizeWithPresenceIconStyle)}
      </div>
    );
  }

  private _onRenderIcon = (className?: string, style?: React.CSSProperties): JSX.Element => (
    <Icon className={className} iconName={determineIcon(this.props.presence, this.props.isOutOfOffice)} style={style} />
  );
}

function determineIcon(
  presence: PersonaPresenceEnum | undefined,
  isOutOfOffice: boolean | undefined,
): string | undefined {
  if (!presence) {
    return undefined;
  }

  const oofIcon = 'SkypeArrow';

  switch (PersonaPresenceEnum[presence]) {
    case 'online':
      return 'SkypeCheck';
    case 'away':
      return isOutOfOffice ? oofIcon : 'SkypeClock';
    case 'dnd':
      return 'SkypeMinus';
    case 'offline':
      return isOutOfOffice ? oofIcon : '';
  }

  return '';
}
