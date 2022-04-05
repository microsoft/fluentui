import { isMac } from './osDetector';

/* eslint-disable @fluentui/max-len */

function testIsMac(agent: string, result: boolean): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).__defineGetter__('userAgent', (): string => {
    return agent;
  });
  expect(isMac(true)).toBe(result);
}

describe('isMac', () => {
  it('is true for Mac Chrome', () => {
    testIsMac(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      true,
    );
  });

  it('is true for Mac Safari', () => {
    testIsMac(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
      true,
    );
  });

  it('is true for Mac Firefox', () => {
    testIsMac('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0', true);
  });

  it('is false for iPad', () => {
    testIsMac(
      'Mozilla/5.0 (iPad; CPU OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1',
      false,
    );
  });

  it('is false for iPhone', () => {
    testIsMac(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      false,
    );
  });

  it('is false for iPod touch', () => {
    testIsMac(
      'Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11B511 Safari/9537.53',
      false,
    );
  });

  it('is false for Android', () => {
    testIsMac(
      'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      false,
    );
  });

  it('is false for Windows phone', () => {
    testIsMac(
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 710)',
      false,
    );
  });

  it('is false for Windows Chrome', () => {
    testIsMac(
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
      false,
    );
  });

  it('is false for Windows Firefox', () => {
    testIsMac('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1', false);
  });

  it('is false for desktop Edge', () => {
    testIsMac(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
      false,
    );
  });

  it('is false for desktop Internet Explorer', () => {
    testIsMac('Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko', false);
  });
});
