/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file WindowWidthUtility, returns window size
 */

export default class WindowWidthUtility {
  public static currentFabricBreakpoint(): string {
    const _windowWidth: number = window.innerWidth;

    switch (true) {
      case _windowWidth < 480:
        return 'SM';
      case _windowWidth >= 480 && _windowWidth < 640:
        return 'MD';
      case _windowWidth >= 640 && _windowWidth < 1024:
        return 'LG';
      case _windowWidth >= 1024 && _windowWidth < 1366:
        return 'XL';
      case _windowWidth >= 1366 && _windowWidth < 1920:
        return 'XXL';
      case _windowWidth >= 1920:
        return 'XXXL';
      default:
        return 'SM';
    }
  }
}
