import * as React from 'react';
import { acceptsVisibleProp } from './stagger-utils';
import { Fade } from '../components/Fade/Fade';
import { Scale } from '../components/Scale/Scale';
import { Slide } from '../components/Slide/Slide';

describe('acceptsVisibleProp', () => {
  it('should return true for components with visible prop set to true', () => {
    const element = React.createElement('div', { visible: true });
    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should return true for components with visible prop set to false', () => {
    const element = React.createElement('div', { visible: false });
    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should return true for components with visible prop (even if undefined)', () => {
    const element = React.createElement('div', { visible: undefined });
    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should return false for components without visible prop', () => {
    const element = React.createElement('div', { className: 'test' });
    expect(acceptsVisibleProp(element)).toBe(false);
  });

  it('should return false for components with empty props', () => {
    const element = React.createElement('div', {});
    expect(acceptsVisibleProp(element)).toBe(false);
  });

  it('should return false for components with null props', () => {
    const element = React.createElement('div', null);
    expect(acceptsVisibleProp(element)).toBe(false);
  });

  it('should return true for functional components with visible prop', () => {
    const TestComponent: React.FC<{ visible?: boolean; children?: React.ReactNode }> = () => <div />;
    const element = React.createElement(TestComponent, { visible: true });
    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should return false for functional components without visible prop', () => {
    const TestComponent: React.FC<{ className?: string }> = () => <div />;
    const element = React.createElement(TestComponent, { className: 'test' });
    expect(acceptsVisibleProp(element)).toBe(false);
  });

  it('should handle components with multiple props including visible', () => {
    const element = React.createElement('div', {
      id: 'test',
      className: 'test-class',
      visible: false,
      'data-testid': 'test',
    });
    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should handle components with multiple props excluding visible', () => {
    const element = React.createElement('div', {
      id: 'test',
      className: 'test-class',
      'data-testid': 'test',
    });
    expect(acceptsVisibleProp(element)).toBe(false);
  });

  describe('edge cases', () => {
    it('should handle props with visibility-related names but not exactly "visible"', () => {
      const element1 = React.createElement('div', { isVisible: true });
      const element2 = React.createElement('div', { visibility: 'hidden' });
      const element3 = React.createElement('div', { show: true });

      expect(acceptsVisibleProp(element1)).toBe(false);
      expect(acceptsVisibleProp(element2)).toBe(false);
      expect(acceptsVisibleProp(element3)).toBe(false);
    });

    it('should be case sensitive for the visible prop', () => {
      const element1 = React.createElement('div', { Visible: true });
      const element2 = React.createElement('div', { VISIBLE: true });

      expect(acceptsVisibleProp(element1)).toBe(false);
      expect(acceptsVisibleProp(element2)).toBe(false);
    });

    it('should handle components where visible is a non-boolean value', () => {
      const element1 = React.createElement('div', { visible: 'true' });
      const element2 = React.createElement('div', { visible: 1 });
      const element3 = React.createElement('div', { visible: {} });

      expect(acceptsVisibleProp(element1)).toBe(true);
      expect(acceptsVisibleProp(element2)).toBe(true);
      expect(acceptsVisibleProp(element3)).toBe(true);
    });
  });
});

describe('acceptsVisibleProp - Symbol Detection', () => {
  it('should detect Fade component without explicit visible prop', () => {
    const element = (
      <Fade>
        <div>Content</div>
      </Fade>
    );

    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should detect Scale component without explicit visible prop', () => {
    const element = (
      <Scale>
        <div>Content</div>
      </Scale>
    );

    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should detect Slide component without explicit visible prop', () => {
    const element = (
      <Slide>
        <div>Content</div>
      </Slide>
    );

    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should still work with explicit visible prop', () => {
    const element = (
      <Fade visible={true}>
        <div>Content</div>
      </Fade>
    );

    expect(acceptsVisibleProp(element)).toBe(true);
  });

  it('should return false for regular div without visible prop', () => {
    const element = <div>Content</div>;

    expect(acceptsVisibleProp(element)).toBe(false);
  });

  it('should return true for regular div with explicit visible prop', () => {
    const element = React.createElement('div', { visible: true }, 'Content');

    expect(acceptsVisibleProp(element)).toBe(true);
  });
});
