import * as ts from 'typescript';
import { validateCallbackType } from './validateCallbackType';

describe('validateCallbackType', () => {
  it('should throw an error if node is not a TypeReferenceNode', () => {
    const node = ts.factory.createStringLiteral('test');
    expect(() => validateCallbackType(node)).toThrowError(`A callback should use EventHandler type`);
  });

  it('should throw an error if node is not a TypeReferenceNode to EventHandler', () => {
    const node = ts.factory.createTypeReferenceNode('Test');
    expect(() => validateCallbackType(node)).toThrowError(`A callback should use EventHandler type`);
  });

  it('should throw an error if typeParam is not a TypeReferenceNode', () => {
    const node = ts.factory.createTypeReferenceNode('EventHandler', []);
    expect(() => validateCallbackType(node)).toThrowError(
      `A callback should have a type parameter that extends EventData`,
    );
  });

  it('should not throw an error if node and typeParam are TypeReferenceNodes', () => {
    const typeParam = ts.factory.createTypeReferenceNode('EventData', []);
    const node = ts.factory.createTypeReferenceNode('EventHandler', [typeParam]);
    expect(() => validateCallbackType(node)).not.toThrow();
  });
});
