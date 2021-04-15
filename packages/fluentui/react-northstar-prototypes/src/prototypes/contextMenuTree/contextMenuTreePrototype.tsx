import * as React from 'react';
import {
  TriangleDownIcon,
  TriangleEndIcon,
  MenuButton,
  Tree,
  Ref,
  Button,
  MoreIcon,
  Box,
} from '@fluentui/react-northstar';

const renderChildren = (C, p) => {
  return <CustomTreeItem component={C} props={p} />;
};

const CustomTreeItem = ({ component, props }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const targetRef = React.useRef(null);
  const Component = component;

  return (
    <MenuButton
      open={menuOpen}
      position="below"
      onOpenChange={(e, { open }) => {
        e.preventDefault();
        setMenuOpen(open);
      }}
      contextMenu
      positionFixed
      target={targetRef.current}
      menu={[1, 2, props.title]}
      trigger={
        <Box>
          <Component {...props} />
          <Ref innerRef={targetRef}>
            <Button
              data-is-focusable="false"
              icon={<MoreIcon />}
              text
              onClick={e => {
                e.stopPropagation();
                setMenuOpen(true);
              }}
            />
          </Ref>
        </Box>
      }
    />
  );
};

const items = [
  {
    id: 'tree-item-1',
    title: 'House Lannister',
    children: renderChildren,
    items: [
      {
        id: 'tree-item-11',
        title: 'Tywin',
        children: renderChildren,
        items: [
          {
            id: 'tree-item-111',
            children: renderChildren,
            title: 'Jaime',
          },
          {
            id: 'tree-item-112',
            children: renderChildren,
            title: 'Cersei',
          },
          {
            id: 'tree-item-113',
            children: renderChildren,
            title: 'Tyrion',
          },
        ],
      },
      {
        id: 'tree-item-12',
        children: renderChildren,
        title: 'Kevan',
        items: [
          {
            id: 'tree-item-121',
            children: renderChildren,
            title: 'Lancel',
          },
          {
            id: 'tree-item-122',
            children: renderChildren,
            title: 'Willem',
          },
          {
            id: 'tree-item-123',
            children: renderChildren,
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-item-2',
    title: 'House Targaryen',
    children: renderChildren,
    items: [
      {
        id: 'tree-item-21',
        children: renderChildren,
        title: 'Aerys',
        items: [
          {
            id: 'tree-item-211',
            children: renderChildren,
            title: 'Rhaegar',
          },
          {
            id: 'tree-item-212',
            children: renderChildren,
            title: 'Viserys',
          },
          {
            id: 'tree-item-213',
            children: renderChildren,
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
];

const titleRenderer = (C, p) => {
  return <TitleWithMenu component={C} {...p} />;
};

const TitleWithMenu = ({ component, content, expanded, open, hasSubtree, ...restProps }) => {
  const Component = component;
  return (
    <MenuButton
      trigger={
        <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
          {expanded ? <TriangleDownIcon /> : <TriangleEndIcon />}
          {content}
        </Component>
      }
    />
  );
};

const ContextMenuTreePrototype = () => {
  return <Tree items={items} renderItemTitle={titleRenderer} />;
};

export default ContextMenuTreePrototype;
