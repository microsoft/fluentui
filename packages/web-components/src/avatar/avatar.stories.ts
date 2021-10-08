import { DOCS_RENDERED } from '@storybook/core-events';
import addons from '@storybook/addons';
import { baseHeightMultiplier } from '../design-tokens';
import AvatarTemplate from './fixtures/avatar.html';
import './index';

export default {
  title: 'Components/Avatar',
};

addons.getChannel().addListener(DOCS_RENDERED, (name: string) => {
  if (name.toLowerCase().startsWith('components/avatar')) {
    const myAvatar40 = document.getElementById('my-avatar-40') as HTMLElement;
    if (myAvatar40) {
      baseHeightMultiplier.setValueFor(myAvatar40, 10);
    }
    const myAvatar72 = document.getElementById('my-avatar-72') as HTMLElement;
    if (myAvatar72) {
      baseHeightMultiplier.setValueFor(myAvatar72, 18);
    }
    const avatar20 = document.getElementById('avatar-20') as HTMLElement;
    if (avatar20) {
      baseHeightMultiplier.setValueFor(avatar20, 5);
    }
    const avatar24 = document.getElementById('avatar-24') as HTMLElement;
    if (avatar24) {
      baseHeightMultiplier.setValueFor(avatar24, 6);
    }
    const avatar28 = document.getElementById('avatar-28') as HTMLElement;
    if (avatar28) {
      baseHeightMultiplier.setValueFor(avatar28, 7);
    }
    const avatar32 = document.getElementById('avatar-32') as HTMLElement;
    if (avatar32) {
      baseHeightMultiplier.setValueFor(avatar32, 8);
    }
    const avatar36 = document.getElementById('avatar-36') as HTMLElement;
    if (avatar36) {
      baseHeightMultiplier.setValueFor(avatar36, 9);
    }
    const avatar40 = document.getElementById('avatar-40') as HTMLElement;
    if (avatar40) {
      baseHeightMultiplier.setValueFor(avatar40, 10);
    }
    const avatar48 = document.getElementById('avatar-48') as HTMLElement;
    if (avatar48) {
      baseHeightMultiplier.setValueFor(avatar48, 12);
    }
    const avatar56 = document.getElementById('avatar-56') as HTMLElement;
    if (avatar56) {
      baseHeightMultiplier.setValueFor(avatar56, 14);
    }
    const avatar64 = document.getElementById('avatar-64') as HTMLElement;
    if (avatar64) {
      baseHeightMultiplier.setValueFor(avatar64, 16);
    }
    const avatar72 = document.getElementById('avatar-72') as HTMLElement;
    if (avatar72) {
      baseHeightMultiplier.setValueFor(avatar72, 18);
    }
    const avatar96 = document.getElementById('avatar-96') as HTMLElement;
    if (avatar96) {
      baseHeightMultiplier.setValueFor(avatar96, 24);
    }
  }
});

export const avatar = () => AvatarTemplate;
