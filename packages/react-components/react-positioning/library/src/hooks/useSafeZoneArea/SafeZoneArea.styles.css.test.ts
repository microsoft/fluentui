import { useStyles } from './SafeZoneArea.styles.css';

jest.mock('./SafeZoneArea.module.css', () => ({
  wrapper: 'css-wrapper',
  wrapperActive: 'css-wrapperActive',
  svg: 'css-svg',
  safeZone: 'css-safeZone',
  safeZoneDebug: 'css-safeZoneDebug',
  rectDebug: 'css-rectDebug',
}));

describe('SafeZoneArea CSS Modules', () => {
  it('preserves the complete style helper contract', () => {
    expect(useStyles()).toEqual({
      wrapper: 'css-wrapper',
      wrapperActive: 'css-wrapperActive',
      svg: 'css-svg',
      safeZone: 'css-safeZone',
      safeZoneDebug: 'css-safeZoneDebug',
      rectDebug: 'css-rectDebug',
    });
  });
});
