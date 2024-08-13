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
  FluentProvider,
  teamsLightTheme,
} from '@fluentui/react-components';
import { mount as mountBase } from '@cypress/react';

// eslint-disable-next-line @griffel/styles-file
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
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

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = props => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref}>+{overflowCount} items</MenuButton>
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

const mount = (element: JSX.Element) => {
  mountBase(
    <React.StrictMode>
      <FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>
    </React.StrictMode>,
  );
};

describe('Overflow', () => {
  const items = new Array(8).fill(0).map((_, i) => i.toString());

  it('should render a Overflow', () => {
    const Default = () => {
      const styles = useStyles();

      return (
        <Overflow>
          <div className={mergeClasses(styles.container, styles.resizableArea)}>
            {items.map(i => (
              <OverflowItem key={i} id={i}>
                <Button>Item {i}</Button>
              </OverflowItem>
            ))}
            <OverflowMenu itemIds={items} />
          </div>
        </Overflow>
      );
    };

    mount(<Default />);

    cy.viewport(1000, 1000);
    cy.get('.fui-Overflow').should('exist').get('[data-overflow-item]').should('have.length', 8);
    cy.get('.fui-Overflow [data-overflowing]').should('not.exist');
    cy.get('.fui-Overflow [data-overflow-menu]').should('not.exist');
    cy.viewport(600, 600);
    cy.get('.fui-Overflow [data-overflowing]').should('have.length', 4);
    cy.get('.fui-Overflow [data-overflow-menu]').should('exist');
  });
});
