import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IconCodes } from '@uifabric/styling';
import { IIconTileStyles, getStyles } from './IconTile.styles';

export interface IIconTileProps extends React.HTMLProps<HTMLDivElement> {
  iconName: string;
}

export function IconTile(props: IIconTileProps): JSX.Element {
  const { iconName, ...divProps }: IIconTileProps = props;
  const styles: IIconTileStyles = getStyles();

  return (
    <div className={ styles.iconTile as string } { ...divProps }>
      <i className={ styles.icon as string }>{ IconCodes[iconName] }</i>
      <div>{ iconName }</div>
    </div>
  );
}
