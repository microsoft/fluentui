import { cssifyObject } from './cssifyObject';

describe('cssifyObject', () => {
  it('should generate a valid CSS string', () => {
    expect(cssifyObject({ color: 'red' })).toEqual('color:red');
  });

  it('should convert properties to dash case', () => {
    expect(cssifyObject({ fontSize: '12px' })).toEqual('font-size:12px');
  });

  it('should separate declarations with semicolons', () => {
    expect(
      cssifyObject({
        fontSize: '12px',
        color: 'red',
      }),
    ).toEqual('font-size:12px;color:red');
  });

  it('should convert vendor prefixes', () => {
    expect(
      cssifyObject({
        WebkitJustifyContent: 'center',
        msFlexAlign: 'center',
      }),
    ).toEqual('-webkit-justify-content:center;-ms-flex-align:center');
  });
});
