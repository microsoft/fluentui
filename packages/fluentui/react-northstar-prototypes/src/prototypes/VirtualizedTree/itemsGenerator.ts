import * as _ from 'lodash';

function getItemsWithHeight(
  minItems = 20,
  maxItems = 40,
  maxLevel = 2,
  getItemHeight = (level: number): number => (level === 1 ? 20 : 40),
) {
  function getItemsNumber(minItems, maxItems) {
    return _.random(minItems, maxItems);
  }

  function generateLevel(level, parent = '') {
    const result = [];
    _.times(getItemsNumber(minItems, maxItems), index => {
      const item = {
        id: `${parent}${parent ? '-' : ''}${index}`,
        title: `Tree-Item-${parent}${parent ? '-' : ''}${index}`,
        itemSize: getItemHeight(level),
        ...(level < maxLevel && { items: generateLevel(level + 1, `${parent}${index}`) }),
      };
      result.push(item);
    });
    return result;
  }

  return generateLevel(1);
}

export default getItemsWithHeight;
