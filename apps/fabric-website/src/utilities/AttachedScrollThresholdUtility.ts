/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file AttachedScrollThresholdUtility, returns window size
 */

export default class AttachedScrollThresholdUtility {
  public static attachedHeaderHeight = 128;

  public static calculateAttachedScrollThreshold(): number {
    const FULL_HEADER_HEIGHT = 236;
    const UHF_ADJUSTMENT = 12;
    const attachedScrollThreshold = FULL_HEADER_HEIGHT - AttachedScrollThresholdUtility.attachedHeaderHeight - UHF_ADJUSTMENT;
    return attachedScrollThreshold;
  }
}