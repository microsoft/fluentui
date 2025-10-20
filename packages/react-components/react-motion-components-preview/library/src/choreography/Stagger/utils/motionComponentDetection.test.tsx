import * as React from 'react';
import {
  isPresenceComponent,
  isMotionComponent,
  hasExplicitProps,
  acceptsDelayProps,
  acceptsVisibleProp,
} from './motionComponentDetection';
import { createMotionComponent } from '@fluentui/react-motion';
import { Fade } from '../../../components/Fade';

describe('Motion Component Detection', () => {
  describe('hasExplicitProps', () => {
    it('should detect explicit props correctly', () => {
      const TestComponent = ({
        delay,
        visible,
        children,
      }: {
        delay?: number;
        visible?: boolean;
        children: React.ReactNode;
      }) => <div>{children}</div>;
      const elementWithBothProps = (
        <TestComponent delay={100} visible={true}>
          Test
        </TestComponent>
      );
      const elementWithoutProps = <TestComponent>Test</TestComponent>;

      expect(hasExplicitProps(elementWithBothProps, ['delay', 'visible'])).toBe(true);
      expect(hasExplicitProps(elementWithoutProps, ['delay'])).toBe(false);
    });

    it('should return false when element has first prop but not second prop', () => {
      const TestComponent = ({
        delay,
        visible,
        children,
      }: {
        delay?: number;
        visible?: boolean;
        children: React.ReactNode;
      }) => <div>{children}</div>;

      // Element has delay but not visible - should return FALSE because not ALL props exist
      const elementWithOnlyDelay = <TestComponent delay={100}>Test</TestComponent>;
      expect(hasExplicitProps(elementWithOnlyDelay, ['delay', 'visible'])).toBe(false);

      // Element has visible but not delay - should return FALSE because not ALL props exist
      const elementWithOnlyVisible = <TestComponent visible={true}>Test</TestComponent>;
      expect(hasExplicitProps(elementWithOnlyVisible, ['delay', 'visible'])).toBe(false);
    });

    it('should return true only when ALL props exist', () => {
      const TestComponent = ({
        delay,
        visible,
        children,
      }: {
        delay?: number;
        visible?: boolean;
        children: React.ReactNode;
      }) => <div>{children}</div>;

      // Element has both delay and visible - should return TRUE
      const elementWithBothProps = (
        <TestComponent delay={100} visible={true}>
          Test
        </TestComponent>
      );
      expect(hasExplicitProps(elementWithBothProps, ['delay', 'visible'])).toBe(true);

      // Element has only one prop - should return FALSE
      const elementWithOneProps = <TestComponent delay={100}>Test</TestComponent>;
      expect(hasExplicitProps(elementWithOneProps, ['delay', 'visible'])).toBe(false);
    });

    it('should handle undefined and null values correctly', () => {
      const TestComponent = ({
        delay,
        visible,
        children,
      }: {
        delay?: number;
        visible?: boolean;
        children: React.ReactNode;
      }) => <div>{children}</div>;

      // Element has undefined delay - this should still be considered as having the prop
      const elementWithUndefinedDelay = <TestComponent delay={undefined}>Test</TestComponent>;
      expect(hasExplicitProps(elementWithUndefinedDelay, ['delay'])).toBe(true);

      // Element has null visible - this should still be considered as having the prop
      const elementWithNullVisible = <TestComponent visible={null as unknown as boolean}>Test</TestComponent>;
      expect(hasExplicitProps(elementWithNullVisible, ['visible'])).toBe(true);
    });
  });

  describe('isPresenceComponent', () => {
    it('should detect presence components via MOTION_DEFINITION symbol', () => {
      const presenceElement = (
        <Fade>
          <div>Test</div>
        </Fade>
      );
      const motionElement = (
        <Fade.In>
          <div>Test</div>
        </Fade.In>
      );
      const regularElement = <div>Test</div>;

      expect(isPresenceComponent(presenceElement)).toBe(true);
      expect(isPresenceComponent(motionElement)).toBe(false); // .In/.Out are motion components
      expect(isPresenceComponent(regularElement)).toBe(false);
    });
  });

  describe('isMotionComponent', () => {
    it('should detect motion components via "Atom" function name', () => {
      const CustomMotion = createMotionComponent({ keyframes: [{ opacity: 0 }, { opacity: 1 }], duration: 300 });
      const customMotionElement = (
        <CustomMotion>
          <div>Test</div>
        </CustomMotion>
      );
      const fadeInElement = (
        <Fade.In>
          <div>Test</div>
        </Fade.In>
      );
      const presenceElement = (
        <Fade>
          <div>Test</div>
        </Fade>
      );
      const regularElement = <div>Test</div>;

      expect(isMotionComponent(customMotionElement)).toBe(true);
      expect(isMotionComponent(fadeInElement)).toBe(true); // .In/.Out are motion components
      expect(isMotionComponent(presenceElement)).toBe(false);
      expect(isMotionComponent(regularElement)).toBe(false);
    });
  });

  describe('acceptsDelayProps - Core Stagger Logic', () => {
    it('should return true for presence components (guaranteed delay support)', () => {
      const element = (
        <Fade>
          <div>Test</div>
        </Fade>
      );
      expect(acceptsDelayProps(element)).toBe(true);
    });

    it('should return true for .In/.Out variants (motion components from presence)', () => {
      const element = (
        <Fade.In>
          <div>Test</div>
        </Fade.In>
      );
      expect(acceptsDelayProps(element)).toBe(true);
    });

    it('should return true for custom motion components (heuristic)', () => {
      const CustomMotion = createMotionComponent({ keyframes: [{ opacity: 0 }, { opacity: 1 }], duration: 300 });
      const element = (
        <CustomMotion>
          <div>Test</div>
        </CustomMotion>
      );
      expect(acceptsDelayProps(element)).toBe(true);
    });

    it('should return true for elements with explicit delay and exitDelay props', () => {
      const TestComponent = ({
        delay,
        exitDelay,
        children,
      }: {
        delay?: number;
        exitDelay?: number;
        children: React.ReactNode;
      }) => <div>{children}</div>;
      const element = (
        <TestComponent delay={100} exitDelay={200}>
          Test
        </TestComponent>
      );
      expect(acceptsDelayProps(element)).toBe(true);
    });

    it('should return false for elements with only one delay prop', () => {
      const TestComponent = ({
        delay,
        exitDelay,
        children,
      }: {
        delay?: number;
        exitDelay?: number;
        children: React.ReactNode;
      }) => <div>{children}</div>;
      const elementWithOnlyDelay = <TestComponent delay={100}>Test</TestComponent>;
      const elementWithOnlyExitDelay = <TestComponent exitDelay={200}>Test</TestComponent>;
      expect(acceptsDelayProps(elementWithOnlyDelay)).toBe(false);
      expect(acceptsDelayProps(elementWithOnlyExitDelay)).toBe(false);
    });

    it('should return false for regular elements', () => {
      const element = <div>Test</div>;
      expect(acceptsDelayProps(element)).toBe(false);
    });
  });

  describe('acceptsVisibleProp - Core Stagger Logic', () => {
    it('should return true for presence components', () => {
      const element = (
        <Fade>
          <div>Test</div>
        </Fade>
      );
      expect(acceptsVisibleProp(element)).toBe(true);
    });

    it('should return true for elements with explicit visible prop', () => {
      const TestComponent = ({ visible, children }: { visible?: boolean; children: React.ReactNode }) => (
        <div>{children}</div>
      );
      const element = <TestComponent visible={true}>Test</TestComponent>;
      expect(acceptsVisibleProp(element)).toBe(true);
    });

    it('should return false for regular elements', () => {
      const element = <div>Test</div>;
      expect(acceptsVisibleProp(element)).toBe(false);
    });
  });
});
