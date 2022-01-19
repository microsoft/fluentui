import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FluentIconsProps } from '@fluentui/react-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ReactIcons from '@fluentui/react-icons';
import { Input } from '@fluentui/react-input';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  grid: theme => ({
    width: '100%',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    marginRight: 'auto',
    display: 'block',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '10px',
    fontFamily: 'Arial',
    maxWidth: '105ch',
    position: 'relative',

    '& span': {
      width: '50%',
      display: 'inline-block',
      flexDirection: 'column',
      margin: '0px 4px',

      '& svg': {
        display: 'inline-block',
      },

      // '& div': {
      //   color: theme.colorNeutralForeground1,
      //   fontSize: '16px',
      //   // opacity: '0',
      // },

      // '&:hover': {
      //   overflow: 'visible',

      //   '& span': {
      //     opacity: '1',
      //   },
      // },
    },
  }),

  searchBox: {
    maxWidth: '320px',
  },

  radio: {
    fontSize: 'small',
    fontFamily: 'Courier New, Courier, monospace',
  },
});

const reactIcons: React.FC<ReactIcons.FluentIconsProps>[] = Object.keys(ReactIcons)
  .map(iconName => ReactIcons[iconName])
  .filter(icon => !!icon && !!icon.displayName);

export const ReactIconGrid = () => {
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
      <span key={Icon.displayName} aria-label={Icon.displayName} className={styles.grid}>
        <Icon />
        <div className={styles.grid}>{Icon.displayName}</div>
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
        // eslint-disable-next-line react/jsx-no-bind
        onChange={_onSearchQueryChanged}
        className={styles.searchBox}
      />
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
      <div className={styles.grid}>{filteredIcons.map(_renderIcon)}</div>
    </div>
  );
};
