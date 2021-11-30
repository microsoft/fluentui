import * as React from 'react';
import * as stylesImport from './ReactIconGrid.module.scss';
import { IIconGridProps } from './IconGridProps.types';
import { FluentIconsProps } from '@fluentui/react-icons';
const styles: any = stylesImport;

export const ReactIconGrid = (iconGridProps: IIconGridProps) => {
  const [search, setSearch] = React.useState('');
  const [size, setSize] = React.useState('');

  const _onSearchQueryChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.currentTarget.value);
  };

  const _getItems = (props: IIconGridProps): React.FC<FluentIconsProps>[] => {
    const { icons } = props;

    return icons.filter(
      icon =>
        icon &&
        icon.displayName &&
        icon.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
        icon.displayName.indexOf(size) !== -1,
    );
  };

  const _filterBySize = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = ev.currentTarget.value;
    newSize === 'All' ? setSize('') : setSize(newSize);
  };

  const _renderIcon = (Icon: React.FC<FluentIconsProps>): JSX.Element => {
    let iconClassName = `ms-Icon ms-Icon--${Icon.displayName}`;

    return (
      <li key={Icon.displayName} aria-label={Icon.displayName}>
        <Icon className={iconClassName} />
        <span>{Icon.displayName}</span>
      </li>
    );
  };

  const filteredIcons = _getItems(iconGridProps);

  return (
    <div>
      <input placeholder="Search icons" value={search} onChange={_onSearchQueryChanged} className={styles.searchBox} />
      <input type="radio" value={16} name="size" onChange={_filterBySize} />
      <label className={styles.radio}>16</label>
      <input type="radio" value={20} name="size" onChange={_filterBySize} />
      <label className={styles.radio}>20</label>
      <input type="radio" value={24} name="size" onChange={_filterBySize} />
      <label className={styles.radio}>24</label>
      <input type="radio" value={28} name="size" onChange={_filterBySize} />
      <label className={styles.radio}>28</label>
      <input type="radio" value={32} name="size" onChange={_filterBySize} />
      <label className={styles.radio}>32</label>
      <input type="radio" value={48} name="size" onChange={_filterBySize} />
      <label className={styles.radio}>48</label>
      <input type="radio" value="All" name="size" onChange={_filterBySize} />
      <label className={styles.radio}>All</label>
      <ul className={styles.grid}>{filteredIcons.map(_renderIcon)}</ul>
    </div>
  );
};
