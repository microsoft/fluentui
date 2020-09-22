import { calcAvatarStyleProps } from './calcAvatarStyleProps';
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
    const styleProps = calcAvatarStyleProps({ active: false });
    expect(styleProps.inactive).toBe(true);
  });

  it('sets default activeDisplay props when active={true}', () => {
    const styleProps = calcAvatarStyleProps({ active: true });
    expect(styleProps.inactive).toBeFalsy();
    expect(styleProps.activeRing).toBe(true);
    expect(styleProps.activeShadow).toBeFalsy();
    expect(styleProps.activeGlow).toBeFalsy();
  });

  it('sets ring/shadow/glow props when activeDisplay="shadow"', () => {
    const styleProps = calcAvatarStyleProps({ active: true, activeDisplay: 'shadow' });
    expect(styleProps.inactive).toBeFalsy();
    expect(styleProps.activeRing).toBeFalsy();
    expect(styleProps.activeShadow).toBe(true);
    expect(styleProps.activeGlow).toBeFalsy();
  });

  it('sets ring/shadow/glow props when activeDisplay="glow"', () => {
    const styleProps = calcAvatarStyleProps({ active: true, activeDisplay: 'glow' });
    expect(styleProps.inactive).toBeFalsy();
    expect(styleProps.activeRing).toBeFalsy();
    expect(styleProps.activeShadow).toBeFalsy();
    expect(styleProps.activeGlow).toBe(true);
  });

  it('sets ring/shadow/glow props when activeDisplay="ring-shadow"', () => {
    const styleProps = calcAvatarStyleProps({ active: true, activeDisplay: 'ring-shadow' });
    expect(styleProps.inactive).toBeFalsy();
    expect(styleProps.activeRing).toBe(true);
    expect(styleProps.activeShadow).toBe(true);
    expect(styleProps.activeGlow).toBeFalsy();
  });

  it('sets ring/shadow/glow props when activeDisplay="ring-glow"', () => {
    const styleProps = calcAvatarStyleProps({ active: true, activeDisplay: 'ring-glow' });
    expect(styleProps.inactive).toBeFalsy();
    expect(styleProps.activeRing).toBe(true);
    expect(styleProps.activeShadow).toBeFalsy();
    expect(styleProps.activeGlow).toBe(true);
  });

  it('does not set any activity props when active is not set', () => {
    const styleProps = calcAvatarStyleProps({ activeDisplay: 'ring-glow' });
    expect(styleProps.inactive).toBeFalsy();
    expect(styleProps.activeRing).toBeFalsy();
    expect(styleProps.activeShadow).toBeFalsy();
    expect(styleProps.activeGlow).toBeFalsy();
  });
});
