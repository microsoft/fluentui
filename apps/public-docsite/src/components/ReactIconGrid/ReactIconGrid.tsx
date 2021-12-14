import * as React from 'react';
import * as stylesImport from './ReactIconGrid.module.scss';
import { FluentIconsProps } from '@fluentui/react-icons';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupStyles } from '@fluentui/react/lib/ChoiceGroup';
import * as ReactIcons from '@fluentui/react-icons';
const styles: any = stylesImport;

const reactIcons: React.FC<ReactIcons.FluentIconsProps>[] = Object.keys(ReactIcons)
  .map(iconName => ReactIcons[iconName])
  .filter(icon => !!icon && !!icon.displayName);

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

const ReactIconGrid = () => {
  const [search, setSearch] = React.useState('');
  const [size, setSize] = React.useState('');

  const _onSearchQueryChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.currentTarget.value);
  };

  const _filterBySize = (ev: React.FormEvent<HTMLInputElement>) => {
    const newSize = ev.currentTarget.value;
    newSize === 'All' ? setSize('') : setSize(newSize);
  };

  const _renderIcon = (Icon: React.FC<FluentIconsProps>): JSX.Element => {
    return (
      <li key={Icon.displayName} aria-label={Icon.displayName}>
        <Icon />
        <span>{Icon.displayName}</span>
      </li>
    );
  };

  const filteredIcons = React.useMemo(
    () =>
      reactIcons.filter(
        icon =>
          icon.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1 && icon.displayName.indexOf(size) !== -1,
      ),
    [search, size],
  );

  return (
    <div>
      <SearchBox
        placeholder="Search icons"
        value={search}
        onChange={_onSearchQueryChanged}
        className={styles.searchBox}
      />
      <ChoiceGroup label="Sizes" styles={cstyles} defaultSelectedKey="All" options={options} onChange={_filterBySize} />
      <ul className={styles.grid}>{filteredIcons.map(_renderIcon)}</ul>
    </div>
  );
};

export default ReactIconGrid;
