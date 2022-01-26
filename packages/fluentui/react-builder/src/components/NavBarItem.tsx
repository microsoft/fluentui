import * as React from 'react';
import { Box, Tooltip, Menu } from '@fluentui/react-northstar';

export type NavBarItemProps = {
  title: string;
  icon: any;
  isSelected: boolean;
  onClickHandler: () => void;
};

export const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({ title, icon, isSelected, onClickHandler }) => {
  return (
    <Box
      styles={({ theme }) => ({
        height: '3.4rem',
        display: 'flex',
        alignItems: 'center',
        background: isSelected ? `${theme.siteVariables.colorScheme.default.background2}` : 'inherit',
        position: 'relative',
      })}
    >
      {isSelected && (
        <Box
          styles={({ theme }) => ({
            position: 'absolute',
            width: '2px',
            height: '32px',
            background: `${theme.siteVariables.colorScheme.brand.foreground1}`,
            top: '8px',
            left: '4px',
          })}
        />
      )}
      <Tooltip
        pointing
        position="after"
        align="center"
        trigger={
          <Menu.Item iconOnly style={{ marginLeft: '6px' }} onClick={onClickHandler} active={isSelected}>
            {icon}
          </Menu.Item>
        }
        content={title}
      />
    </Box>
  );
};
