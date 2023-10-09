export interface IVendorSettings {
  isWebkit?: boolean;
  isMoz?: boolean;
  isMs?: boolean;
  isOpera?: boolean;
}

let _vendorSettings: IVendorSettings | undefined;

export function getVendorSettings(): IVendorSettings {
  if (!_vendorSettings) {
    // eslint-disable-next-line no-restricted-globals
    const doc = typeof document !== 'undefined' ? document : undefined;
    const nav = typeof navigator !== 'undefined' ? navigator : undefined;
    const userAgent = nav?.userAgent?.toLowerCase();

    if (!doc) {
      _vendorSettings = {
        isWebkit: true,
        isMoz: true,
        isOpera: true,
        isMs: true,
      };
    } else {
      _vendorSettings = {
        isWebkit: !!(doc && 'WebkitAppearance' in doc.documentElement.style),
        isMoz: !!(userAgent && userAgent.indexOf('firefox') > -1),
        isOpera: !!(userAgent && userAgent.indexOf('opera') > -1),
        isMs: !!(nav && (/rv:11.0/i.test(nav.userAgent) || /Edge\/\d./i.test(navigator.userAgent))),
      };
    }
  }

  return _vendorSettings;
}

/**
 * Sets the vendor settings for prefixing and vendor specific operations.
 */
export function setVendorSettings(vendorSettings?: IVendorSettings): void {
  _vendorSettings = vendorSettings;
}
