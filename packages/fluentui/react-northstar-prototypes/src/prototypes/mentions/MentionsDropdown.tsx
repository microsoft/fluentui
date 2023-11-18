import * as React from 'react';
import { Property } from 'csstype';
import { Dropdown, DropdownItemProps, Provider } from '@fluentui/react-northstar';

import { MentionsContainerProps } from './MentionsEditor';

type RenderItem = {
  Item: React.ReactType;
  props: DropdownItemProps;
  fontWeight: Property.FontWeight;
};

const MentionsDropdown: React.FunctionComponent<MentionsContainerProps> = props => {
  const { searchQuery, items, onOpenChange, onSearchQueryChange, onInputKeyDown } = props;

  const renderItem = React.useCallback((args: RenderItem) => getCustomItem({ ...args, searchQuery }), [searchQuery]);

  return (
    <Provider.Consumer
      render={({ siteVariables: siteVars }) => (
        <Dropdown
          highlightFirstItemOnOpen
          open
          inline
          search
          position="above"
          items={items}
          renderItem={
            searchQuery ? (Item, props) => renderItem({ Item, props, fontWeight: siteVars.fontWeightBold }) : undefined
          }
          toggleIndicator={null}
          searchInput={{
            input: { autoFocus: true, size: searchQuery.length + 1 },
            onInputKeyDown,
          }}
          onOpenChange={onOpenChange}
          onSearchQueryChange={onSearchQueryChange}
          noResultsMessage="We couldn't find any matches."
        />
      )}
    />
  );
};

const getCustomItem = (args: {
  Item: React.ReactType;
  props: DropdownItemProps;
  searchQuery: string;
  fontWeight: Property.FontWeight;
}) => {
  const { Item, props, searchQuery, fontWeight } = args;
  const { header, ...rest } = props;

  if (!header || typeof header !== 'string') return <Item {...props} />;

  const queryStartIndex = header.indexOf(searchQuery);

  if (queryStartIndex < 0) return <Item {...props} />;

  const queryEndIndex = queryStartIndex + searchQuery.length;

  return (
    <Item
      header={
        <span>
          {header.substring(0, queryStartIndex)}
          <span style={{ fontWeight }}>{header.substring(queryStartIndex, queryEndIndex)}</span>
          {header.substring(queryEndIndex)}
        </span>
      }
      {...rest}
    />
  );
};

export default MentionsDropdown;
