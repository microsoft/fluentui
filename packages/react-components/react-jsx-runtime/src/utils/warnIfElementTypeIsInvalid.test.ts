import * as React from 'react';
import { warnIfElementTypeIsInvalid } from './warnIfElementTypeIsInvalid';

describe('warnIfElementTypeIsInvalid', () => {
  let consoleErrorSpy: jest.SpyInstance;
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  describe('should NOT warn for valid element types', () => {
    const FunctionComponent = () => null;
    class ClassComponent extends React.Component {
      public render() {
        return null;
      }
    }
    const ForwardRefComponent = React.forwardRef(() => null);
    const MemoComponent = React.memo(() => null);
    const LazyComponent = React.lazy(() => Promise.resolve({ default: () => null }));

    it.each([
      ['string types (built-in components)', 'div'],
      ['function components', FunctionComponent],
      ['class components', ClassComponent],
      ['React.Fragment', React.Fragment],
      ['React.forwardRef components', ForwardRefComponent],
      ['React.memo components', MemoComponent],
      ['React.lazy components', LazyComponent],
    ])('should not warn for %s', (_description, type) => {
      warnIfElementTypeIsInvalid(type as React.ElementType);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('should warn for invalid element types', () => {
    it.each([
      ['plain objects', { foo: 'bar' }],
      ['arrays', [1, 2, 3]],
      ['empty objects', {}],
    ])('should warn for %s', (_description, invalidType) => {
      warnIfElementTypeIsInvalid(invalidType as React.ElementType);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('@fluentui/react-jsx-runtime:'));
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Element type is invalid'));
    });
  });

  describe('should handle edge cases', () => {
    it.each([
      ['number', 42],
      ['string', 'invalidType'],
      ['boolean true', true],
      ['boolean false', false],
      ['null', null],
      ['undefined', undefined],
    ])('should not warn for %s', (_description, value) => {
      warnIfElementTypeIsInvalid(value as React.ElementType);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should not warn in production mode', () => {
      process.env.NODE_ENV = 'production';
      const invalidType = { foo: 'bar' };
      warnIfElementTypeIsInvalid(invalidType as unknown as React.ElementType);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});
