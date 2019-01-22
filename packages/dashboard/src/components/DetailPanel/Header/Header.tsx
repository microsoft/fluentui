import * as React from 'react';
import { IDetailPanelHeaderProps, IQuickAction } from '../DetailPanel.types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { detailPanelHeaderStyles } from '../DetailPanel.styles';

const header: React.SFC<IDetailPanelHeaderProps> = (props: IDetailPanelHeaderProps) => {
  const css = detailPanelHeaderStyles;
  const _onRenderAction = (): JSX.Element | null => {
    const { quickActions } = props;
    if (quickActions) {
      return (
        <div>
          {quickActions
            .filter((_: IQuickAction) => !!!_.hide)
            .map((_: IQuickAction, i: number) => (
              <span key={`${i}_${_.actionName}`}>
                <IconButton iconProps={{ iconName: _.icon }} onClick={_.onClick} title={_.actionName} />
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
    const { title, personaHeader } = props;

    if (personaHeader) {
      return (
        <div className={css.personaMode}>
          <Persona
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

export { header as Header };
