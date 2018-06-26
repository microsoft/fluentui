/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file AttachedScrollUtility, returns window size
 */

export default class AttachedScrollUtility {
  public static attachedHeaderHeight = 128;

  public static shouldComponentAttach(isAttached, attachedScrollThreshold): boolean {
    if (window.pageYOffset >= attachedScrollThreshold) {
      isAttached = true;
    } else {
      isAttached = false;
    }
    return isAttached;
  }

  public static calculateAttachedScrollThreshold(): number {
    const UHF_HEADER_HEIGHT = 50;
    const attachedScrollThreshold = UHF_HEADER_HEIGHT * 2;
    return attachedScrollThreshold;
  }
}
