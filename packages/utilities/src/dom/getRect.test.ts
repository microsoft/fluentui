import { getRect } from './getRect';

describe('getRect', () => {
  it('uses the supplied window when measuring that window', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const frameWindow = iframe.contentWindow!;

    try {
      expect(getRect(frameWindow, frameWindow)).toEqual({
        left: 0,
        top: 0,
        width: frameWindow.innerWidth,
        height: frameWindow.innerHeight,
        right: frameWindow.innerWidth,
        bottom: frameWindow.innerHeight,
      });
    } finally {
      iframe.remove();
    }
  });
});
