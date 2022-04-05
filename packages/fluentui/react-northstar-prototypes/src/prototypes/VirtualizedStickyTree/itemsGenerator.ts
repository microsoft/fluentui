import * as _ from 'lodash';

function getItems(minItems = 5, maxItems = 15, maxLevel = 2, maxSticky = 10) {
  function getItemsNumber(min: number, max: number) {
    return _.random(min, max);
  }

  function generateLevel(level: number, parent = '') {
    const result = [];
    _.times(getItemsNumber(minItems, level === 0 ? Math.min(maxSticky, maxItems) : maxItems), index => {
      const item = {
        id: `${parent}${parent ? '-' : ''}${index}`,
        title: `Tree-Item-${parent}${parent ? '-' : ''}${index}`,
        ...(level < maxLevel && { items: generateLevel(level + 1, `${parent}${index}`) }),
      };
      result.push(item);
    });
    return result;
  }

  return generateLevel(0);
}

export default getItems;
