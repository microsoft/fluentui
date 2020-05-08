import felaExpandCssShorthandsPlugin from 'src/utils/felaExpandCssShorthandsPlugin';
import { ICSSInJSStyle } from '@fluentui/styles';

const expandCssShorthands = felaExpandCssShorthandsPlugin();

describe('felaExpandCssShorthandsPlugin', () => {
  test('should expand margin prop', () => {
    const style = {
      display: 'block',
      margin: '0px 10px',
    };

    expect(expandCssShorthands(style)).toMatchObject({
      display: 'block',
      marginTop: '0px',
      marginRight: '10px',
      marginBottom: '0px',
      marginLeft: '10px',
    });
  });

  test('should handle "undefined" and "null"', () => {
    const style = {
      margin: '10px',
      marginLeft: null,
      marginRight: undefined,
    };

    expect(expandCssShorthands(style)).toMatchObject({
      marginTop: '10px',
      marginRight: undefined,
      marginBottom: '10px',
      marginLeft: null,
    });
  });

  test('should handle arrays', () => {
    const style: ICSSInJSStyle = {
      margin: ['10px', '0px'] as any,
    };

    expect(expandCssShorthands(style)).toMatchObject({
      marginTop: ['10px', '0px'],
      marginRight: ['10px', '0px'],
      marginBottom: ['10px', '0px'],
      marginLeft: ['10px', '0px'],
    });
  });

  test('should expand pseudo object', () => {
    const style = {
      display: 'block',
      '::before': {
        margin: '0px',
      },
    };

    expect(expandCssShorthands(style)).toMatchObject({
      display: 'block',
      '::before': {
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
      },
    });
  });

  test('should expand nested pseudo object', () => {
    const style = {
      display: 'block',
      '::before': {
        margin: '0px',
        ':hover': {
          padding: '10px',
        },
      },
    };

    expect(expandCssShorthands(style)).toMatchObject({
      display: 'block',
      '::before': {
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        ':hover': {
          paddingTop: '10px',
          paddingRight: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px',
        },
      },
    });
  });

  test('should merge expanded prop with its shorthand', () => {
    const style = {
      marginTop: '3px',
      margin: '10px',
      marginRight: '15px',
    };

    expect(expandCssShorthands(style)).toMatchObject({
      marginTop: '10px', // overridden by margin: '10px'
      marginRight: '15px', // overridden by marginRight: '15px'
      marginBottom: '10px',
      marginLeft: '10px',
    });
  });
});
