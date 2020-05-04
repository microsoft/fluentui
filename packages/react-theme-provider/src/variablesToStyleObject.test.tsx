import { variablesToStyleObject } from './variablesToStyleObject';

describe('variablesToStyleObject', () => {
  it('can convert flat variables', () => {
    expect(
      variablesToStyleObject({
        body: 'red',
      }),
    ).toEqual({
      '--body': 'red',
    });
  });

  it('can convert nested variables', () => {
    expect(
      variablesToStyleObject({
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
      variablesToStyleObject(
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
});
