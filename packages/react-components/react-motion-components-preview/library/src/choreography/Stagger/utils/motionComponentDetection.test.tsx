import * as React from 'react';
import {
  isPresenceComponent,
  isMotionComponent,
  acceptsDelayProps,
  acceptsVisibleProp,
} from './motionComponentDetection';
import { createMotionComponent } from '@fluentui/react-motion';
import { Fade } from '../../../components/Fade';

describe('Motion Component Detection', () => {
  // Explicit prop detection removed; related tests deleted.

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
    it('should detect motion components via MOTION_DEFINITION symbol', () => {
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

    it('should return false for regular elements', () => {
      const element = <div>Test</div>;
      expect(acceptsVisibleProp(element)).toBe(false);
    });
  });
});
