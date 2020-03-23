import * as _ from 'lodash';

function getItems(minItems = 20, maxItems = 40) {
  function getRandomNumber(minItems, maxItems) {
    return _.random(minItems, maxItems);
  }

  function getRandomName() {
    const names = ['Roman', 'Alex', 'Ali', 'Bo', 'Timbuktu', 'Daria', 'E.T.'];
    const addLongName = Math.random() > 0.5;
    return names[Math.floor(Math.random() * names.length)] + (addLongName ? ' van von der Longername' : '');
  }

  function generateRows() {
    const header = {
      key: 'header',
      items: [
        { content: 'id', key: 'id' },
        { content: 'Name', key: 'name' },
        { content: 'Picture', key: 'pic' },
        { content: 'Age', key: 'action' },
      ],
    };
    const rowsPlain = _.times(getRandomNumber(minItems, maxItems), index => ({
      key: `${index}`,
      items: [
        { content: `${index}`, key: `${index}-1` },
        {
          content: getRandomName(),
          truncateContent: true,
          key: `${index}-2`,
        },
        { content: 'None', key: `${index}-3` },
        { content: `${getRandomNumber(10, 1000)} years`, key: `${index}-4` },
      ],
    }));

    return { header, rows: rowsPlain };
  }

  return generateRows();
}

export default getItems;
