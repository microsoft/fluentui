import { tokensToStyleObject } from './tokensToStyleObject';

describe('tokensToStyleObject', () => {
  it('can convert flat tokens', () => {
    expect(
      tokensToStyleObject({
        body: 'red',
      }),
    ).toEqual({
      '--body': 'red',
    });
  });

  it('can convert nested tokens', () => {
    expect(
      tokensToStyleObject({
        body: {
          fill: 'red',
          text: 'blue',
        },
      }),
    ).toEqual({
      '--body-fill': 'red',
      '--body-text': 'blue',
    });
  });

  it('can start with a prefix', () => {
    expect(
      tokensToStyleObject(
        {
          body: {
            fill: 'red',
            text: 'blue',
          },
        },
        '--ms',
      ),
    ).toEqual({
      '--ms-body-fill': 'red',
      '--ms-body-text': 'blue',
    });
  });

  it('can no-op on objects that have already been converted', () => {
    const styleObject = tokensToStyleObject(
      {
        background: 'red',
      },
      '--button',
    );

    expect(tokensToStyleObject(styleObject)).toBe(styleObject);
  });
});
