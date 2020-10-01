import { AvatarStyleProps, calcAvatarStyleProps } from './calcAvatarStyleProps';
import { avatarSizeValues } from './index';

describe('calcAvatarStyleProps', () => {
  it('sets the size prop to the next-lower AvatarSizeValue', () => {
    for (const standardSize of avatarSizeValues) {
      const styleProps = calcAvatarStyleProps({ customSize: standardSize + 3 });
      expect(styleProps.size).toBe(standardSize);
    }
  });

  it('sets height and width tokens for customSize', () => {
    const styleProps = calcAvatarStyleProps({ customSize: 99 });
    expect(styleProps.tokens).toEqual({
      width: '99px',
      height: '99px',
    });
  });

  it('respects user-defined style tokens', () => {
    const styleProps = calcAvatarStyleProps({ customSize: 99, tokens: { width: '101px', borderRadius: '42%' } });
    expect(styleProps.tokens).toEqual({
      height: '99px',
      width: '101px',
      borderRadius: '42%',
    });
  });

  it('sets inactive when active={false}', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ active: false }));
    expect(activeProps).toEqual({ inactive: true });
  });

  it('sets default activeDisplay props when active={true}', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ active: true }));
    expect(activeProps).toEqual({ activeRing: true });
  });

  it('sets ring/shadow/glow props when activeDisplay="shadow"', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ active: true, activeDisplay: 'shadow' }));
    expect(activeProps).toEqual({ activeShadow: true });
  });

  it('sets ring/shadow/glow props when activeDisplay="glow"', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ active: true, activeDisplay: 'glow' }));
    expect(activeProps).toEqual({ activeGlow: true });
  });

  it('sets ring/shadow/glow props when activeDisplay="ring-shadow"', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ active: true, activeDisplay: 'ring-shadow' }));
    expect(activeProps).toEqual({ activeRing: true, activeShadow: true });
  });

  it('sets ring/shadow/glow props when activeDisplay="ring-glow"', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ active: true, activeDisplay: 'ring-glow' }));
    expect(activeProps).toEqual({ activeRing: true, activeGlow: true });
  });

  it('does not set any activity props when active is not set', () => {
    const activeProps = filterActiveProps(calcAvatarStyleProps({ activeDisplay: 'ring-glow' }));
    expect(activeProps).toEqual({});
  });
});

const filterActiveProps = (styleProps: AvatarStyleProps) => ({
  inactive: styleProps.inactive,
  activeRing: styleProps.activeRing,
  activeGlow: styleProps.activeGlow,
  activeShadow: styleProps.activeShadow,
});
