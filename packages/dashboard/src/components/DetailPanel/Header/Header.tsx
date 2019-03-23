import * as React from 'react';
import { IDetailPanelHeaderProps, IQuickAction, IDetailPanelAnalytics } from '../DetailPanel.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { detailPanelHeaderStyles } from '../DetailPanel.styles';
import { withAnalyticsHandler } from '../DetailPanelAnalyticsContext';

type DetailPanelHeaderProps = IDetailPanelHeaderProps & IDetailPanelAnalytics;

const header: React.SFC<DetailPanelHeaderProps> = (props: DetailPanelHeaderProps) => {
  const css = detailPanelHeaderStyles;

  const _onQuickActionClick = (quickAction: IQuickAction) => () => {
    const { analyticsHandler } = props;
    if (analyticsHandler) {
      analyticsHandler('quickaction', 'click', quickAction);
    }

    quickAction.onClick();
  };

  const _onRenderAction = (): JSX.Element | null => {
    const { quickActions } = props;
    if (quickActions) {
      return (
        <div>
          {quickActions
            .filter((_: IQuickAction) => !!!_.hide)
            .map((_: IQuickAction, i: number) => (
              <span key={`${i}_${_.actionName}`}>
                <IconButton iconProps={{ iconName: _.icon }} onClick={_onQuickActionClick(_)} title={_.actionName} />
              </span>
            ))}
        </div>
      );
    }

    return null;
  };

  const _onRenderStatus = (): JSX.Element | null => {
    const { status } = props;

    if (status !== undefined) {
      return <div>{status}</div>;
    }

    return null;
  };

  const _renderElement = () => {
    const { title, personaHeader, imageAlt, imageInitials, imageUrl } = props;

    if (personaHeader) {
      return (
        <div className={css.personaMode}>
          <Persona
            imageAlt={imageAlt}
            imageUrl={imageUrl}
            imageInitials={imageInitials}
            size={PersonaSize.size100}
            primaryText={title}
            onRenderSecondaryText={_onRenderAction}
            onRenderTertiaryText={_onRenderStatus}
          />
        </div>
      );
    }

    return <div className={css.textMode}>{title}</div>;
  };

  return _renderElement();
};

const Header = withAnalyticsHandler<DetailPanelHeaderProps>(header);
export { Header, DetailPanelHeaderProps };
