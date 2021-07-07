import * as rootPreview from '../../../.storybook/preview';

export const decorators = [...rootPreview.decorators];

export const parameters = {
  options: {
    storySort: (a, b) => {
      if (a[1].name === 'Default') {
        console.log('xxx');
        return -1;
      }

      if (b[1].name === 'Default') {
        return 1;
      }

      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
};
