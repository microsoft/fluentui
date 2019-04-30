import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import {
  IDetailPanelConfirmationResultProps,
  ConfirmationStatus,
  IDetailPanelConfirmationStatusText,
  IDetailPanelConfirmationLinks,
  IDetailPanelLinkItem
} from '../DetailPanel.types';
import { detailPanelConfirmationStyles } from '../DetailPanel.styles';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const confirmationResult: React.FunctionComponent<IDetailPanelConfirmationResultProps> = (props: IDetailPanelConfirmationResultProps) => {
  const css = detailPanelConfirmationStyles;
  const _getStatusIcon = (status?: ConfirmationStatus) => {
    if (status) {
      switch (status) {
        case ConfirmationStatus.Success: {
          return <Icon iconName="SkypeCircleCheck" className={mergeStyles(css.headerIcon, css.iconSuccess)} />;
        }
        case ConfirmationStatus.Failed: {
          return <Icon iconName="StatusErrorFull" className={mergeStyles(css.headerIcon, css.IconFailed)} />;
        }
        case ConfirmationStatus.Warning: {
          return <Icon iconName="AlertSolid" className={mergeStyles(css.headerIcon)} />;
        }
      }
    }

    return null;
  };

  const _getStatusItem = () => {
    const { statusItems } = props;
    if (statusItems) {
      return (
        <>
          {statusItems().map((_: IDetailPanelConfirmationStatusText, i: number) => {
            return (
              <div key={i}>
                <div className={css.statusTitle}>
                  {_getStatusIcon(_.status)}
                  {_.title}
                </div>
                {_.items && (
                  <ul className={css.statusItems}>
                    {_.items.map((__: string, ii: number) => {
                      return <li key={`${i}_${ii}`}>{__}</li>;
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </>
      );
    }

    return null;
  };

  const _getLinkList = () => {
    const { linkList } = props;
    if (linkList) {
      return (
        <>
          {linkList().map((_: IDetailPanelConfirmationLinks, i: number) => {
            return (
              <div key={i}>
                <div className={css.linkListTitle}>{_.title}</div>
                {_.links && (
                  <ul className={css.linkListItems}>
                    {_.links.map((__: IDetailPanelLinkItem, ii: number) => {
                      return (
                        <li key={`${i}_${ii}`}>
                          <Link target={__.linkHref} href={__.linkHref} onClick={__.linkAction}>
                            {__.linkText}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </>
      );
    }

    return null;
  };

  const _renderElement = () => {
    const { overallStatus, headerText, descriptionText } = props;
    return (
      <div>
        <div className={css.header}>
          {_getStatusIcon(overallStatus)}
          {headerText}
        </div>
        {descriptionText && <div className={css.description}>{descriptionText}</div>}
        {_getStatusItem()}
        {_getLinkList()}
      </div>
    );
  };

  return _renderElement();
};

export { confirmationResult as ConfirmationResult };
