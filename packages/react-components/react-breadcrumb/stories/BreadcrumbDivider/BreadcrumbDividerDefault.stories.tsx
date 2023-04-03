import * as React from 'react';
import { BreadcrumbDivider, Breadcrumb, BreadcrumbItem, BreadcrumbButton } from '@fluentui/react-breadcrumb';
import {
  makeStyles,
  shorthands,
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
} from '@fluentui/react-components';
import { buttonItems } from '../Breadcrumb/data';
import { MoreHorizontalRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
    ...shorthands.padding('20px', '10px', '10px', '10px'),
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      ...shorthands.padding('1px', '4px', '1px'),
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

export const Default = () => {
  const styles = useStyles();
  return (
    <>
      <Overflow>
        <ol className={mergeClasses(styles.container, styles.resizableArea)}>
          {buttonItems.map(i => (
            // <React.Fragment >
            <OverflowItem key={i.key} id={`${i.key}`}>
              <BreadcrumbItem>
                <BreadcrumbButton {...i.buttonProps}>Item {i.item}</BreadcrumbButton>
              </BreadcrumbItem>
            </OverflowItem>
            //   <BreadcrumbDivider />
            // </React.Fragment>
          ))}

          <OverflowMenu buttonItems={buttonItems} />
        </ol>
      </Overflow>
    </>
  );
};

const OverflowMenuItem: React.FC<{ item: any; id: Pick<OverflowItemProps, 'id'> }> = props => {
  const { id, item } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
  return <BreadcrumbButton {...item.buttonProps}>{item.item}</BreadcrumbButton>;
};

const OverflowMenu: React.FC<{ buttonItems: any }> = ({ buttonItems }) => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref} icon={<MoreHorizontalRegular />} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {buttonItems.map(item => {
            return <OverflowMenuItem key={item.key} item={item} id={item.key} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
