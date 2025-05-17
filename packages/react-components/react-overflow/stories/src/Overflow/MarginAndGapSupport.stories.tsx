import * as React from 'react';
import {
  makeStyles,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItem,
  OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Checkbox,
  type CheckboxProps,
  type OverflowImperativeRef,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  gap: {
    gap: '10px',
  },

  margin: {
    margin: '10px',
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '1000px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
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

export const MarginAndGapSupport = () => {
  const styles = useStyles();
  const [useGap, setUseGap] = React.useState(true);
  const [useMargin, setUseMargin] = React.useState(false);
  const imperativeRef = React.useRef<OverflowImperativeRef>();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  const onChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>): CheckboxProps['onChange'] =>
    (_e, data) => {
      setter(data.checked as boolean);
      imperativeRef.current?.updateOverflow();
    };

  return (
    <>
      <div>
        <Checkbox onChange={onChange(setUseGap)} checked={useGap} label="Use column gap" />
        <Checkbox onChange={onChange(setUseMargin)} checked={useMargin} label="Use margins" />
      </div>
      <Overflow imperativeRef={imperativeRef} boxModel="inline-margin" measureGap>
        <div className={mergeClasses(styles.container, styles.resizableArea, useGap && styles.gap)}>
          {itemIds.map((i, index) => (
            <OverflowItem key={i} id={i}>
              <Button style={{ marginLeft: useMargin && index > 0 ? 20 : 0 }}>Item {i}</Button>
            </OverflowItem>
          ))}
          <OverflowMenu useMargin={useMargin} itemIds={itemIds} />
        </div>
      </Overflow>
    </>
  );
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = props => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[]; useMargin: boolean }> = ({ itemIds, useMargin }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton style={{ marginLeft: useMargin ? 20 : 0 }} ref={ref}>
          +{overflowCount} items
        </MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map(i => {
            return <OverflowMenuItem key={i} id={i} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
