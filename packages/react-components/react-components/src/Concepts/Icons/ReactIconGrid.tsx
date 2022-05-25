import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FluentIconsProps } from '@fluentui/react-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ReactIcons from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: ' flex-start',

    '> span': {
      alignItems: 'center',
      color: '#3b3a39',
      display: 'flex',
      flexDirection: 'column',
      height: '80px',
      justifyContent: 'space-around',
      ...shorthands.padding(0),
      width: '80px',
      ...shorthands.overflow('hidden'),

      '> div': {
        fontSize: '11px',
        opacity: '0',
      },

      '&:hover': {
        ...shorthands.overflow('visible'),

        '& div': {
          opacity: '1',
        },
      },
    },
  },

  searchBox: {
    maxWidth: '320px',
    marginBottom: '10px',
  },

  radio: {
    fontSize: '11px',
  },
});

const reactIcons: React.FC<ReactIcons.FluentIconsProps>[] = Object.keys(ReactIcons)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .map(iconName => (ReactIcons as any)[iconName])
  .filter(icon => !!icon && !!icon.displayName);

const ReactIconGrid = () => {
  const [search, setSearch] = React.useState('');
  const [size, setSize] = React.useState('');
  const styles = useStyles();

  const _onSearchQueryChanged = (ev?: React.FormEvent<HTMLInputElement>) => {
    setSearch(ev ? ev.currentTarget.value : '');
  };

  const _filterBySize = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>) => {
    const newSize = ev ? (ev.currentTarget as HTMLInputElement).value : '';
    newSize === 'All' ? setSize('') : setSize(newSize);
  };

  const _renderIcon = (Icon: React.FC<FluentIconsProps>): JSX.Element => {
    return (
      <span key={Icon.displayName} aria-label={Icon.displayName}>
        <Icon />
        <div>{Icon.displayName}</div>
      </span>
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
      <Input
        type="search"
        placeholder="Search icons"
        value={search}
        aria-label="search"
        // eslint-disable-next-line react/jsx-no-bind
        onChange={_onSearchQueryChanged}
        className={styles.searchBox}
      />
      {[16, 20, 24, 28, 32, 48, 'All'].map(option => (
        <>
          <input id={`option-${option}`} type="radio" value={option} name="size" onChange={_filterBySize} />
          <label htmlFor={`option-${option}`} className={styles.radio}>
            {option}
          </label>
        </>
      ))}
      <div className={styles.grid}>{filteredIcons.map(_renderIcon)}</div>
    </div>
  );
};

export default ReactIconGrid;
