import { baseLayerLuminance, StandardLuminance } from '../src/index';

export function toggleBgMode() {
  const bgChecked = document.getElementById('luminance-switch')!.classList.contains('checked');
  if (bgChecked) {
    baseLayerLuminance.setValueFor(document.body, StandardLuminance.LightMode);
  } else {
    baseLayerLuminance.setValueFor(document.body, StandardLuminance.DarkMode);
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
