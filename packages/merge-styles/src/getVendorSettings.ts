export interface IVendorSettings {
  isWebkit?: boolean;
  isMoz?: boolean;
  isMs?: boolean;
  isOpera?: boolean;
}

let _vendorSettings: IVendorSettings | undefined;

export function getVendorSettings(): IVendorSettings {
  if (!_vendorSettings) {
    const doc = typeof document !== 'undefined' ? document : undefined;

    if (!doc) {
      _vendorSettings = {
        isWebkit: true,
        isMoz: true,
        isOpera: true,
        isMs: true
      };
    } else {
        const nav = typeof navigator !== 'undefined' ? navigator : undefined;
        const userAgent = nav && nav.userAgent ? nav.userAgent.toLowerCase() : undefined;

      _vendorSettings = {
        isWebkit: !!('WebkitAppearance' in doc.documentElement.style),
        isMoz: !!(userAgent && userAgent.indexOf('firefox') > -1),
        isOpera: !!(userAgent && userAgent.indexOf('opera') > -1),
        isMs: !!(userAgent && (/rv:11.0/i.test(userAgent) || /Edge\/\d./i.test(userAgent)))
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
