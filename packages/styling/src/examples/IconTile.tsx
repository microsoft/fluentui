import * as React from 'react';
import { CSSProperties } from 'glamor';
import * as icons from '../styles/icons';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { getStyles } from './IconTile.styles';

export interface IIconTileProps extends React.HTMLProps<HTMLDivElement> {
  iconName: string;
}

export function IconTile(props: IIconTileProps): JSX.Element {
  const { iconName, ...divProps }: IIconTileProps = props;
  const styles: CSSProperties = getStyles();

  return (
    <div { ...styles.iconTile } { ...divProps }>
      <i { ...styles.icon }>{ icons[iconName] }</i>
      <div>{ iconName }</div>
    </div>
  );
}
