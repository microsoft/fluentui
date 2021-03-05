import { partitionHTMLProps } from 'src/utils/htmlPropsUtils';

const props = {
  autoFocus: false,
  className: 'foo',
  placeholder: 'baz',
  required: true,
};

describe('partitionHTMLProps', () => {
  test('should return two arrays with objects', () => {
    expect(partitionHTMLProps(props)).toHaveLength(2);
  });

  test('should split props by definition', () => {
    const [htmlProps, restProps] = partitionHTMLProps(props);

    expect(htmlProps).toEqual({
      autoFocus: false,
      placeholder: 'baz',
      required: true,
    });
    expect(restProps).toEqual({ className: 'foo' });
  });

  test('should split props by own definition', () => {
    const [htmlProps, restProps] = partitionHTMLProps(props, {
      htmlProps: ['placeholder', 'required'],
    });

    expect(htmlProps).toEqual({ placeholder: 'baz', required: true });
    expect(restProps).toEqual({ autoFocus: false, className: 'foo' });
  });

  describe('aria', () => {
    test('split aria props by default to htmlProps', () => {
      const [htmlProps, restProps] = partitionHTMLProps({
        'aria-atomic': false,
        'aria-busy': true,
        className: 'foo',
        role: 'bar',
      });

      expect(htmlProps).toEqual({
        'aria-atomic': false,
        'aria-busy': true,
        role: 'bar',
      });
      expect(restProps).toEqual({ className: 'foo' });
    });

    test('split aria props by default to restProps when disabled', () => {
      const [htmlProps, restProps] = partitionHTMLProps(
        {
          'aria-atomic': false,
          'aria-busy': true,
          className: 'foo',
          role: 'bar',
        },
        { includeAria: false },
      );

      expect(htmlProps).toEqual({});
      expect(restProps).toEqual({
        'aria-atomic': false,
        'aria-busy': true,
        className: 'foo',
        role: 'bar',
      });
    });
  });
});
