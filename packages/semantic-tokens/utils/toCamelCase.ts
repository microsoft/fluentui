export const toCamelCase = (str: string) => {
  return str
    .split('/')
    .map((word: string, index: number) => {
      // If it is the first word make sure to lowercase all the chars.
      if (index === 0) {
        if (word === 'CTRL' || word === 'STATUS') {
          // Special cases where we need to convert to lower case
          return word.toLowerCase();
        }
        return word;
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};
