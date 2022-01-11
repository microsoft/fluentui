import * as React from 'react';
import { FluentIconsProps } from '@fluentui/react-icons';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupStyles } from '@fluentui/react/lib/ChoiceGroup';
import * as ReactIcons from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  grid: theme => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',

    'grid-list': {
      alignItems: 'center',
      color: theme.colorNeutralForeground1,
      display: 'flex',
      flexDirection: 'column',
      fontSize: theme.fontSizeBase600,
      height: '80px',
      justifyContent: 'space-around',
      padding: '8px',
      width: '80px',
      overflow: 'hidden',

      'list-span': {
        color: theme.colorNeutralForeground1,
        fontSize: theme.fontSizeBase300,
        opacity: '0',
      },

      '&:hover': {
        overflow: 'visible',

        span: {
          opacity: '1',
        },
      },
    },
  }),

  searchBox: () => ({
    margin: '20px',
    maxWidth: '320px',
  }),
});

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
  const styles = useStyles();

  const _onSearchQueryChanged = (ev?: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(ev ? ev.currentTarget.value : '');
  };

  const _filterBySize = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => {
    const newSize = ev ? (ev.currentTarget as HTMLInputElement).value : '';
    newSize === 'All' ? setSize('') : setSize(newSize);
  };

  const _renderIcon = (Icon: React.FC<FluentIconsProps>): JSX.Element => {
    return (
      <li key={Icon.displayName} aria-label={Icon.displayName} className="grid-list">
        <Icon />
        <span className="list-span">{Icon.displayName}</span>
      </li>
    );
  };

  const filteredIcons = React.useMemo(
    () =>
      reactIcons.filter(
        icon =>
          icon.displayName?.toLowerCase().indexOf(search.toLowerCase()) !== -1 &&
          icon.displayName?.indexOf(size) !== -1,
      ),
    [search, size],
  );

  return (
    <div>
      <SearchBox
        placeholder="Search icons"
        value={search}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={_onSearchQueryChanged}
        className={styles.searchBox}
      />
      <ChoiceGroup
        label="Sizes"
        styles={cstyles}
        defaultSelectedKey="All"
        options={options}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={_filterBySize}
      />
      <ul className={styles.grid}>{filteredIcons.map(_renderIcon)}</ul>
    </div>
  );
};

export default ReactIconGrid;
