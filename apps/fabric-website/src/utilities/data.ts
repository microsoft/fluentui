const LOREM_IPSUM = (
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum'
).split(' ');

const DATA = {
  color: ['red', 'blue', 'green', 'yellow'],
  shape: ['circle', 'square', 'triangle'],
  location: ['Seattle', 'New York', 'Chicago', 'Los Angeles', 'Portland']
};

export function createListItems(count: number, startIndex = 0): any {
  return Array.apply(null, Array(count)).map((item, index) => {
    let width = 1000 + Math.round(Math.random() * 2000);
    let height = 1000 + Math.round(Math.random() * 2000);
    let aspectRatio = width / height;

    return {
      thumbnail: `//placekitten.com/${Math.round(75 * aspectRatio)}/${75}`,
      key: 'item-' + (index + startIndex) + ' ' + lorem(4),
      name: lorem(5),
      description: lorem(10 + Math.round(Math.random() * 50)),
      color: _randWord(DATA.color),
      shape: _randWord(DATA.shape),
      location: _randWord(DATA.location),
      width: width,
      height: height
    };
  });
}

export function lorem(wordCount: number): string {
  return Array.apply(null, Array(wordCount))
    .map(item => _randWord(LOREM_IPSUM))
    .join(' ');
}

export function isGroupable(key: string): boolean {
  return key === 'color' || key === 'shape' || key === 'location';
}

function _randWord(array: string[]): string {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}
