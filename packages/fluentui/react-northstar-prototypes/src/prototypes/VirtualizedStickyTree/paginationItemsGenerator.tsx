import * as React from 'react';
import { Loader, ObjectShorthandCollection, TreeItemProps } from '@fluentui/react-northstar';
import * as _ from 'lodash';

export const STICKY_HEADERS = ['Favorite', 'Teams', 'Hidden'];

export const getLoaderId = (headerId: string) => `${headerId}-loader`;
export const getHeaderIdFromLoaderId = (loaderId: string) => loaderId.substring(0, loaderId.indexOf('-loader'));

export const MAX_ITEMS = {
  Favorite: 20,
  Teams: 150,
  Hidden: 150,
};

const getLoader = (headerId: string) => ({
  id: getLoaderId(headerId),
  title: {
    content: <Loader />,
    style: { display: 'flex', height: '100%' },
  },
});

// initially load 15 items under 'Favorite', and render a loader under other sticky headers
export const initialItems: ObjectShorthandCollection<TreeItemProps & { itemSize: number }> = STICKY_HEADERS.map(
  (header, i) =>
    i === 0
      ? {
          id: header,
          title: header,
          itemSize: 20,
          items: [...generateTeams(header, 0, 15, 15), getLoader(header)],
        }
      : {
          id: header,
          title: header,
          itemSize: 20,
          items: [getLoader(header)],
        },
);

export const isHeaderItemFinishedLoading = stickyItem =>
  stickyItem.items[stickyItem.items.length - 1].id !== getLoaderId(stickyItem.id);

export const fetchMoreItems = (currItems, headers: string[]) => {
  headers.forEach(header => {
    const stickyItem = currItems.find(item => item.id === header);
    if (!isHeaderItemFinishedLoading(stickyItem)) {
      loadMoreItemsForOne(stickyItem);
    }
  });

  return [...currItems];
};

const loadMoreItemsForOne = stickyItem => {
  const loader = stickyItem.items.pop();
  const currTeamsNum = stickyItem.items.length;

  stickyItem.items = [...stickyItem.items, ...generateTeams(stickyItem.id, currTeamsNum)];

  if (stickyItem.items.length < MAX_ITEMS[stickyItem.id]) {
    stickyItem.items.push(loader);
  }
};

function generateTeams(header: string, startIndex = 0, minItems = 15, maxItems = 20, maxLevel = 1) {
  function generateLevel(level: number, parent: string, startIndex: number) {
    const result = [];
    const min = Math.min(minItems, MAX_ITEMS[header] - startIndex);
    const max = Math.min(maxItems, MAX_ITEMS[header] - startIndex);
    _.times(getItemsNumber(min, max), index => {
      const id = `${parent}-${index + startIndex}`;
      const item = {
        id,
        title: id,
        itemSize: 30,
        ...(level < maxLevel && { items: generateLevel(level + 1, id, 0) }),
      };
      result.push(item);
    });
    return result;
  }

  return generateLevel(0, header, startIndex);
}

function getItemsNumber(min: number, max: number) {
  return _.random(min, max);
}
