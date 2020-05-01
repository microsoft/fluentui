import componentInfoContext from './componentInfoContext';

/**
 * Returns a the info.json files for another component's @see tags.
 */
const getInfoForSeeTags = (displayName: string) => {
  const info = componentInfoContext.byDisplayName[displayName];

  return info.docblock.tags
    .filter(tag => tag.title === 'see')
    .map(tag => componentInfoContext.byDisplayName[tag.description]);
};

export default getInfoForSeeTags;
