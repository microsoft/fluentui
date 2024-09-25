import * as React from 'react';
import {
  makeStyles,
  ToggleButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItem,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Toolbar,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  toolbar: {
    display: 'block', // toolbar is wrapping just container and overflowContainer which should be displayed on top of each other
  },

  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    // overflow: 'hidden', // moved to resizableArea
    // outline: '1px solid red',
  },

  overflowContainer: {
    // outline: '1px solid green',
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    overflow: 'hidden' /* for resize */,
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});
type Pill = { id: string; selected: boolean };
export const OverflowByPriority = () => {
  const classes = useStyles();

  const [pills, setPills] = React.useState<Pill[]>([
    { id: 'Unread', selected: false },
    { id: 'Chats', selected: false },
    { id: 'Channels', selected: false },
    { id: 'Meetings', selected: false },
    { id: 'Muted', selected: false },
  ]);

  const onPillClick = React.useCallback(
    e => {
      const pillId = e.target.textContent;
      console.log(`Pill clicked`, pillId);
      setPills(pills =>
        pills.map(pill => ({ ...pill, selected: pill.id === pillId ? !pill.selected : pill.selected })),
      );
    },
    [setPills],
  );

  const renderFunction: React.ComponentProps<typeof Overflow>['children'] = props => {
    console.log('renderFunction', props.ref);
    return (
      <>
        <div {...props} className={mergeClasses(props?.className, classes.container)}>
          {pills.map(pill => (
            <OverflowItem key={pill.id} id={pill.id} priority={pill.selected ? 1 : 0}>
              <ToggleButton
                appearance={pill.selected ? 'primary' : undefined}
                shape="circular"
                checked={pill.selected}
                onClick={onPillClick}
              >
                {pill.id}
              </ToggleButton>
            </OverflowItem>
          ))}
        </div>
        <OverflowContainer pills={pills} onPillClick={onPillClick} />
      </>
    );
  };

  return (
    <>
      <div>
        <h2>Requirements</h2>
        <ul>
          <li>All items are part of a single toolbar, navigable using arrow keys.</li>
          <li>When items are overflowing, unselected items are removed first.</li>
          <li>Overflowing selected items are not removed, but rather wrapped to the next row(s).</li>
        </ul>
        <h2>Known issues</h2>
        <ul>
          <li>
            When item is removed (either by overflowing or by unselecting an overflowing selected item), focus goes to
            body.
          </li>
        </ul>
      </div>
      <div className={mergeClasses(classes.resizableArea)}>
        {/* <ToggleButton>{renderFunction}</ToggleButton> */}
        <Toolbar style={{ display: 'block' }}>
          <Overflow>{renderFunction}</Overflow>
        </Toolbar>
      </div>
    </>
  );
};

const OverflowContainer: React.FC<{ pills: Pill[]; onPillClick: React.MouseEventHandler }> = ({
  pills,
  onPillClick,
}) => {
  const classes = useStyles();
  const { isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <div className={classes.overflowContainer}>
      {pills.map(pill => {
        return <OverflowToolbarItem key={pill.id} pill={pill} onPillClick={onPillClick} />;
      })}
    </div>
  );
};

const OverflowToolbarItem: React.FC<{ pill: Pill; onPillClick: React.MouseEventHandler }> = ({ pill, onPillClick }) => {
  const isVisible = useIsOverflowItemVisible(pill.id);

  if (isVisible) {
    // do not show items which are not overflowing the main area
    return null;
  }

  if (!pill.selected) {
    // do not show items which are not selected
    return null;
  }

  return (
    <ToggleButton
      appearance={pill.selected ? 'primary' : undefined}
      shape="circular"
      checked={pill.selected}
      onClick={onPillClick}
    >
      {pill.id}
    </ToggleButton>
  );
};

OverflowByPriority.parameters = {
  docs: {
    description: {
      story: [
        'By assigning each `OverflowItem` a numerical priority, the items can overflow in user configured order',
        'that does not follow DOM order.',
      ].join('\n'),
    },
  },
};
