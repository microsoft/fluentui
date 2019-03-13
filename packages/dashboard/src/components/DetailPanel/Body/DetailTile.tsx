import * as React from 'react';
import { IDetailInfoTileProps, IDetailPanelAnalytics } from '../DetailPanel.types';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { detailTileClassNames } from '../DetailPanel.styles';
import { withAnalyticsHandler } from '../DetailPanelAnalyticsContext';

type DetailInfoTileProps = IDetailInfoTileProps & IDetailPanelAnalytics;
const detailInfoTile: React.SFC<DetailInfoTileProps> = (props: DetailInfoTileProps) => {
  const { title, message, actionText, onAction, tileId } = props;

  const css = detailTileClassNames;

  const _onTileClick = (_event: React.MouseEvent<HTMLElement>) => {
    const { analyticsHandler } = props;
    if (onAction) {
      if (analyticsHandler) {
        analyticsHandler('detailTileLink', 'click', props);
      }
      onAction(tileId);
    }
  };

  return (
    <div className={`${css.item} ms-DetailPanel-Pivot-Item`}>
      <div className={`${css.title} ms-DetailPanel-Pivot-Item-Title`}>{title}</div>
      {message && <div className={css.message}>{message}</div>}
      {actionText && onAction && (
        <div className={css.action}>
          <Link onClick={_onTileClick}>{actionText}</Link>
        </div>
      )}
    </div>
  );
};

const DetailInfoTile = withAnalyticsHandler<DetailInfoTileProps>(detailInfoTile);
export { DetailInfoTile, DetailInfoTileProps };
