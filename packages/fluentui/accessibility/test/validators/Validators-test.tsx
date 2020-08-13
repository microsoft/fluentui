import * as React from 'react';
import { imageBehaviorDefinition, validateBehavior, testBehaviorDefinition } from '../../src/validators';
import { ComponentTestFacade } from './ComponentTestFacade';

export const Image: React.FC<{ alt?: string }> = props => {
  return <img {...props} aria-hidden={props.alt || props['aria-label'] ? undefined : 'true'} />;
};

export const Test: React.FC<{ content?: Record<string, any>; contentLabel?: string }> = props => {
  const { content, contentLabel, children, ...other } = props;
  return (
    <div {...other}>
      <span {...content} aria-label={contentLabel || 'none'}>
        {children}
      </span>
    </div>
  );
};

describe('Validators', () => {
  describe('Image', () => {
    test('accessibility for component', () => {
      const testFacade = new ComponentTestFacade(Image, {});
      const errors = validateBehavior(imageBehaviorDefinition, testFacade);
      expect(errors).toEqual([]);
    });
  });
  describe('Test', () => {
    test('accessibility for component', () => {
      const testFacade = new ComponentTestFacade(Test, { content: { id: 'content' } });
      const errors = validateBehavior(testBehaviorDefinition, testFacade);
      expect(errors).toEqual([]);
    });
  });
});
