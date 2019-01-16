import * as React from 'react';
import { IDetailInfoTileProps } from '../DetailPanel.types';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { detailTileClassNames } from '../DetailPanel.styles';

const detailInfoTile: React.SFC<IDetailInfoTileProps> = (props: IDetailInfoTileProps) => {
  const { title, message, actionText, onAction, tileId } = props;

  const css = detailTileClassNames;

  const _onTileClick = (_event: React.MouseEvent<HTMLElement>) => {
    if (props.onAction) {
      props.onAction(tileId);
    }
  };

  return (
    <div className={css.item}>
      <div className={css.title}>{title}</div>
      {message && <div className={css.message}>{message}</div>}
      {actionText && onAction && (
        <div className={css.action}>
          <Link onClick={_onTileClick}>{actionText}</Link>
        </div>
      )}
    </div>
  );
};

export { detailInfoTile as DetailInfoTile };
