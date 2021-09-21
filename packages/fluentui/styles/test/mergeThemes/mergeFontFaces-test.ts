import { mergeFontFaces } from '@fluentui/styles';

describe('mergeFontFaces', () => {
  test('returns a compact array', () => {
    expect(
      mergeFontFaces(
        undefined,
        null,
        {
          name: 'Segoe UI Web',
          paths: ['public/fonts/segoe-ui-regular.woff2'],
          props: { fontWeight: 400 },
        },
        {
          name: 'Segoe UI Web',
          paths: ['public/fonts/segoe-ui-semibold.woff2'],
          props: { fontWeight: 600 },
        },
        {
          name: 'Segoe UI Web',
          paths: ['public/fonts/segoe-ui-bold.woff2'],
          props: { fontWeight: 700 },
        },
      ),
    ).toEqual([
      {
        name: 'Segoe UI Web',
        paths: ['public/fonts/segoe-ui-regular.woff2'],
        props: { fontWeight: 400 },
      },
      {
        name: 'Segoe UI Web',
        paths: ['public/fonts/segoe-ui-semibold.woff2'],
        props: { fontWeight: 600 },
      },
      {
        name: 'Segoe UI Web',
        paths: ['public/fonts/segoe-ui-bold.woff2'],
        props: { fontWeight: 700 },
      },
    ]);
  });
});
