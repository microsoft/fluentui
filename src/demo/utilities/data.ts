const LOREM_IPSUM = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
  'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
  'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
  'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum').split(' ');

export function createListItems(count: number): any {
  return Array.apply(null, Array(count)).map((item, index) => ({
    key: 'item-' + index,
    name: lorem(2),
    description: lorem(10 + Math.round(Math.random() * 50))
  }));
}

export function lorem(wordCount: number): string {
  return Array.apply(null, Array(wordCount))
    .map(item => LOREM_IPSUM[Math.floor(Math.random() * LOREM_IPSUM.length)])
    .join(' ');
}
