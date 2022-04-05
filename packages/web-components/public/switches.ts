import { Direction } from '@microsoft/fast-web-utilities';
import { baseLayerLuminance, direction, StandardLuminance } from '../src/index';

export function toggleBgMode() {
  const storyContainer = document.querySelector<HTMLElement>('.docs-story')!;
  const bgChecked = this.checked;
  if (bgChecked) {
    baseLayerLuminance.setValueFor(storyContainer, StandardLuminance.DarkMode);
  } else {
    baseLayerLuminance.setValueFor(storyContainer, StandardLuminance.LightMode);
  }
}

export function toggleLtr() {
  const storyContainer = document.querySelector<HTMLElement>('.docs-story')!;
  const dirChecked = this.checked;
  if (dirChecked) {
    storyContainer.style.direction = 'rtl';
    direction.setValueFor(storyContainer, Direction.rtl);
  } else {
    storyContainer.style.direction = 'ltr';
    direction.setValueFor(storyContainer, Direction.ltr);
  }
}
