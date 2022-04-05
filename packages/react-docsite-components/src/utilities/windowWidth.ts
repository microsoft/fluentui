import * as Styling from '@fluentui/react/lib/Styling';

export type FabricBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export function currentFabricBreakpoint(): FabricBreakpoint {
  const _windowWidth: number = window.innerWidth || Styling.ScreenWidthMinXLarge;

  if (_windowWidth < Styling.ScreenWidthMinMedium) {
    return 'sm';
  } else if (_windowWidth < Styling.ScreenWidthMinLarge) {
    return 'md';
  } else if (_windowWidth < Styling.ScreenWidthMinXLarge) {
    return 'lg';
  } else if (_windowWidth < Styling.ScreenWidthMinXXLarge) {
    return 'xl';
  } else if (_windowWidth < Styling.ScreenWidthMinXXXLarge) {
    return 'xxl';
  } else {
    return 'xxxl';
  }
}
