import { isIOS } from './mobileDetector';

const mockNavigator = (agent: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator as any).__defineGetter__('userAgent', (): string => {
    return agent;
  });
};

describe('isIOS', () => {
  it('is true for iPad', () => {
    mockNavigator(
      `Mozilla/5.0 (iPad; CPU OS 10_2_1 like Mac OS X)
      AppleWebKit/602.4.6 (KHTML, like Gecko)
      Version/10.0 Mobile/14D27 Safari/602.1`,
    );

    expect(isIOS()).toBe(true);
  });

  it('is true for iPhone', () => {
    mockNavigator(
      `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X)
      AppleWebKit/604.1.38 (KHTML, like Gecko)
      Version/11.0 Mobile/15A372 Safari/604.1`,
    );

    expect(isIOS()).toBe(true);
  });

  it('is true for iPod touch', () => {
    mockNavigator(
      `Mozilla/5.0 (iPod touch; CPU iPhone OS 7_0_3 like Mac OS X)
      AppleWebKit/537.51.1 (KHTML, like Gecko)
      Version/7.0 Mobile/11B511 Safari/9537.53`,
    );

    expect(isIOS()).toBe(true);
  });

  it('is false for Android', () => {
    mockNavigator(
      `Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K)
      AppleWebkit/534.30 (KHTML, like Gecko)
      Version/4.0 Mobile Safari/534.30`,
    );

    expect(isIOS()).toBe(false);
  });

  it('is false for Windows phone', () => {
    mockNavigator(
      `Mozilla/5.0 (compatible; MSIE 9.0;
      Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; NOKIA; Lumia 710)`,
    );

    expect(isIOS()).toBe(false);
  });

  it('is false for desktop Chrome', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 6.1)
      AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/41.0.2228.0 Safari/537.36`,
    );

    expect(isIOS()).toBe(false);
  });

  it('is false for desktop Firefox', () => {
    mockNavigator(`Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1`);

    expect(isIOS()).toBe(false);
  });

  it('is false for desktop Safari', () => {
    mockNavigator(
      `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3)
      AppleWebKit/537.75.14 (KHTML, like Gecko)
      Version/7.0.3 Safari/7046A194A`,
    );

    expect(isIOS()).toBe(false);
  });

  it('is false for desktop Edge', () => {
    mockNavigator(
      `Mozilla/5.0 (Windows NT 10.0; Win64; x64)
      AppleWebKit/537.36 (KHTML, like Gecko)
      Chrome/42.0.2311.135 Safari/537.36 Edge/12.246`,
    );

    expect(isIOS()).toBe(false);
  });

  it('is false for desktop Internet Explorer', () => {
    mockNavigator(`Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko`);

    expect(isIOS()).toBe(false);
  });
});
