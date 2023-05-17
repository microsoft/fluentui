import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FluentIconsProps } from '@fluentui/react-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ReactIcons from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '10px',
    backgroundColor: '#F7F7F7',
  },

  iconBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    contain: 'content',
    contentVisibility: 'auto',
    ...shorthands.padding('8px'),
    ...shorthands.overflow('hidden'),
  },

  iconName: {
    fontSize: '8px',
    display: 'inline-block',
    height: 'auto',
    ...shorthands.padding('0px 8px'),
  },

  searchBox: {
    backgroundColor: '#F7F7F7',
    maxWidth: '320px',
    marginBottom: '10px',
  },

  radio: {
    backgroundColor: '#F7F7F7',
    fontSize: '11px',
  },
});

const reactIcons: React.FC<ReactIcons.FluentIconsProps>[] = Object.values(ReactIcons).filter(
  icon => !!icon && !!icon.displayName,
);

const ReactIconGrid = () => {
  const [search, setSearch] = React.useState('');
  const [size, setSize] = React.useState<string>('24');
  const styles = useStyles();

  const _onSearchQueryChanged = (ev: React.FormEvent<HTMLInputElement>) => {
    setSearch(ev.currentTarget.value);
  };

  const _filterBySize = (ev: React.FormEvent<HTMLInputElement>) => {
    const newSize = ev.currentTarget.value;
    if (newSize === 'All') {
      setSize('');
    } else if (newSize === 'Unsized') {
      setSize('Unsized');
    } else {
      setSize(newSize);
    }
  };

  const _renderIcon = (Icon: React.FC<FluentIconsProps>): JSX.Element => {
    return (
      <div key={Icon.displayName} aria-label={Icon.displayName} className={styles.iconBox}>
        <Icon />
        <br />
        <code className={styles.iconName}>{Icon.displayName}</code>
      </div>
    );
  };

  const filteredIcons = React.useMemo(
    () =>
      reactIcons.filter(icon => {
        if (size === 'Unsized') {
          return (
            icon.displayName! &&
            !/\d/.test(icon.displayName.toLowerCase()) &&
            icon.displayName?.toLowerCase().includes(search.toLowerCase())
          );
        }

        return icon.displayName?.toLowerCase().includes(search.toLowerCase()) && icon.displayName?.includes(size);
      }),
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
      {['16', '20', '24', '28', '32', '48', 'Unsized', 'All'].map(option => (
        <>
          <input
            id={`option-${option}`}
            defaultChecked={option === '24'}
            type="radio"
            value={option}
            name="size"
            onChange={_filterBySize}
          />
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
