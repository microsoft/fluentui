'use client';

/* eslint-disable import/no-extraneous-dependencies -- shared story fixture outside the stories.tsx exemption */
import * as React from 'react';
import { webLightTheme } from '@fluentui/react-theme';

type ListLike = React.ComponentType<{
  as?: 'ul' | 'ol' | 'div';
  selectionMode?: 'single' | 'multiselect';
  defaultSelectedItems?: string[];
  navigationMode?: 'items' | 'composite';
  children?: React.ReactNode;
  'aria-label'?: string;
}>;

type ListItemLike = React.ComponentType<{
  as?: 'li' | 'div';
  value?: string;
  disabledSelection?: boolean;
  onAction?: () => void;
  checkmark?: null;
  children?: React.ReactNode;
}>;

export type ListVrProviderProps = {
  dark: boolean;
  dir: 'ltr' | 'rtl';
  children: React.ReactNode;
};

const space = webLightTheme.spacingHorizontalL;
const cellStyle: React.CSSProperties = { padding: space };
const action = () => undefined;

/** Each surface exercises the same rows under both directions and both themes. */
export const ListVrScene = ({
  List,
  ListItem,
  Provider,
}: {
  List: ListLike;
  ListItem: ListItemLike;
  Provider: React.ComponentType<ListVrProviderProps>;
}): React.ReactNode => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', gap: space, padding: space }}>
    {[false, true].flatMap(dark =>
      (['ltr', 'rtl'] as const).map(dir => (
        <Provider key={`${dark}-${dir}`} dark={dark} dir={dir}>
          <div
            data-list-surface={`${dark ? 'dark' : 'light'}-${dir}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: space,
              padding: space,
              width: `calc(${webLightTheme.spacingHorizontalXXXL} * 10)`,
            }}
          >
            <List aria-label="Plain">
              <ListItem>Plain first item</ListItem>
              <ListItem>Plain second item</ListItem>
            </List>
            <List as="ol" aria-label="Ordered">
              <ListItem>Ordered first item</ListItem>
              <ListItem>Ordered second item</ListItem>
            </List>
            <List as="div" aria-label="Div list">
              <ListItem as="div">Div first item</ListItem>
            </List>
            <List
              selectionMode="multiselect"
              defaultSelectedItems={['selected', 'disabled-selected']}
              aria-label="Multiple selection"
            >
              <ListItem value="unselected">Unselected</ListItem>
              <ListItem value="selected">Selected</ListItem>
              <ListItem value="disabled" disabledSelection>
                Disabled
              </ListItem>
              <ListItem value="disabled-selected" disabledSelection>
                Disabled selected
              </ListItem>
              <ListItem value="disabled-action" disabledSelection onAction={action}>
                Disabled selection, enabled action
              </ListItem>
              <ListItem value="hidden-checkmark" checkmark={null}>
                No checkmark
              </ListItem>
              <ListItem value="multiline">
                <span>
                  Wrapped label
                  <br />
                  Second line
                </span>
              </ListItem>
            </List>
            <List selectionMode="single" defaultSelectedItems={['first']} aria-label="Single selection">
              <ListItem value="first">First choice</ListItem>
              <ListItem value="second">Second choice</ListItem>
            </List>
            <List navigationMode="items" aria-label="Actions">
              <ListItem onAction={action}>First action</ListItem>
              <ListItem onAction={action}>Second action</ListItem>
            </List>
            <List navigationMode="composite" selectionMode="multiselect" aria-label="Composite">
              <ListItem value="composite-first">
                <span role="gridcell" style={cellStyle}>
                  <button>First control</button>
                  <button>Second control</button>
                </span>
              </ListItem>
              <ListItem value="composite-second">
                <span role="gridcell" style={cellStyle}>
                  <input aria-label="Editable child" defaultValue="Editable" />
                </span>
              </ListItem>
            </List>
            <List aria-label="Nested">
              <ListItem>
                Outer item
                <List>
                  <ListItem>Nested first</ListItem>
                  <ListItem>Nested second</ListItem>
                </List>
              </ListItem>
            </List>
          </div>
        </Provider>
      )),
    )}
  </div>
);
