/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file AttachedScrollThresholdUtility, returns window size
 */

export default class AttachedScrollThresholdUtility {
  public static attachedHeaderHeight = 128;

  public static calculateAttachedScrollThreshold(): number {
    const UHF_HEADER_HEIGHT = 50;
    const attachedScrollThreshold = UHF_HEADER_HEIGHT * 2;
    return attachedScrollThreshold;
  }
}