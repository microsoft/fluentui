import { fillColor, StandardLuminance, SwatchRGB } from '../src/index';

export function toggleBgMode() {
  const bgChecked = document.getElementById('luminance-switch')!.classList.contains('checked');
  if (bgChecked) {
    fillColor.setValueFor(
      document.body,
      SwatchRGB.create(StandardLuminance.LightMode, StandardLuminance.LightMode, StandardLuminance.LightMode),
    );
  } else {
    fillColor.setValueFor(
      document.body,
      SwatchRGB.create(StandardLuminance.DarkMode, StandardLuminance.DarkMode, StandardLuminance.DarkMode),
    );
  }
}

export function toggleLtr() {
  const ltrChecked = document.getElementById('ltr-switch')!.classList.contains('checked');
  if (ltrChecked) {
    document.querySelector<HTMLElement>('.docs-story')!.setAttribute('style', 'direction:ltr;');
  } else {
    document.querySelector<HTMLElement>('.docs-story')!.setAttribute('style', 'direction:rtl;');
  }
}
