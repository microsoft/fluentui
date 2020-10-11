import * as _ from 'lodash';

function getItems(minItems = 5, maxItems = 15, maxLevel = 3) {
  function getItemsNumber(minItems, maxItems) {
    return _.random(minItems, maxItems);
  }

  function generateLevel(level, parent = '') {
    const result = [];
    _.times(getItemsNumber(minItems, maxItems), index => {
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
