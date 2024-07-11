export const loremIpsum = (times = 1) => {
  let text = '';
  for (let i = 0; i < times; i++) {
    text +=
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
  }
  return text;
};
