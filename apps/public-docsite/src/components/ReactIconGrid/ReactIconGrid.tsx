import * as React from 'react';
import * as stylesImport from './ReactIconGrid.module.scss';
import { IIconGridProps } from './IconGridProps.types';
import { FluentIconsProps } from '@fluentui/react-icons';
import { SearchBox } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupStyles } from '@fluentui/react/lib/ChoiceGroup';
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

  const _filterBySize = (ev: React.FormEvent<HTMLInputElement>) => {
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
  const options: IChoiceGroupOption[] = [
    { key: '16', text: '16', value: '16' },
    { key: '20', text: '20', value: '20' },
    { key: '24', text: '24', value: '24' },
    { key: '28', text: '28', value: '28' },
    { key: '32', text: '32', value: '32' },
    { key: '48', text: '48', value: '48' },
    { key: 'All', text: 'All', value: 'All' },
  ];

  const cstyles: Partial<IChoiceGroupStyles> = {
    flexContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: '15px',
    },
  };

  return (
    <div>
      <SearchBox
        placeholder="Search icons"
        value={search}
        onChange={_onSearchQueryChanged}
        className={styles.searchBox}
      />
      <ChoiceGroup styles={cstyles} defaultSelectedKey="All" options={options} onChange={_filterBySize} />
      <ul className={styles.grid}>{filteredIcons.map(_renderIcon)}</ul>
    </div>
  );
};
