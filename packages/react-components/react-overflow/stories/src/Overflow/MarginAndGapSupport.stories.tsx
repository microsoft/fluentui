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
  type OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Checkbox,
  type CheckboxProps,
  type OverflowImperativeRef,
  type JSXElement,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  gap: {
    gap: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },

  margin: {
    margin: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '1000px',
    border: `${tokens.strokeWidthThick} solid ${tokens.colorBrandBackground}`,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalMNudge} ${tokens.spacingVerticalMNudge}`,
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
      top: `calc(-1 * ${tokens.strokeWidthThick})`,
      left: `calc(-1 * ${tokens.strokeWidthThick})`,
      fontFamily: tokens.fontFamilyMonospace,
      fontSize: tokens.fontSizeBase300,
      fontWeight: tokens.fontWeightBold,
      lineHeight: tokens.lineHeightBase300,
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const MarginAndGapSupport = (): JSXElement => {
  const styles = useStyles();
  const [useGap, setUseGap] = React.useState(true);
  const [useMargin, setUseMargin] = React.useState(false);
  const imperativeRef = React.useRef<OverflowImperativeRef | null>(null);

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
      <Overflow imperativeRef={imperativeRef} measureGap>
        <div className={mergeClasses(styles.container, styles.resizableArea, useGap && styles.gap)}>
          {itemIds.map((i, index) => (
            <OverflowItem key={i} id={i}>
              <Button
                style={{
                  marginLeft: useMargin && index > 0 ? tokens.spacingHorizontalXL : tokens.spacingHorizontalNone,
                }}
              >
                Item {i}
              </Button>
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
        <MenuButton
          style={{ marginLeft: useMargin ? tokens.spacingHorizontalXL : tokens.spacingHorizontalNone }}
          ref={ref}
        >
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

MarginAndGapSupport.parameters = {
  docs: {
    description: {
      story: [
        'The `Overflow` component allows you to opt in to spacing measurement with `measureGap`.',
        'In a single-line layout, gaps and margins are measured along the overflow axis, including RTL, reversed layouts, and vertical writing modes.',
        'Alignment free space, hidden elements, and container-edge spacing are excluded; CSS transforms do not affect which items fit.',
        'For auto margins, provide `getAutoMargins`, for example `element => element.hasAttribute("data-align-end") ? ["marginLeft"] : []` for elements marked with `data-align-end`.',
        'This metadata applies to items, dividers, and the overflow menu. Use physical margin properties, and refresh overflow when the metadata changes.',
        'Nested single-line items share a layout parent for gap measurement, including through display:contents wrappers; available capacity remains the observed outer container.',
        'Only active flex/grid gaps contribute spacing. Percentage gaps follow the current layout, including zero cyclic flex gaps.',
        'Call `updateOverflow()` after inner layout changes that do not resize the observed container.',
        'Fractional layout box dimensions and untransformed inline sizes are preserved, and measurement leaves item styles and transitions unchanged.',
      ].join('\n'),
    },
  },
};
