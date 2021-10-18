import { DOCS_RENDERED } from '@storybook/core-events';
import addons from '@storybook/addons';
import AvatarTemplate from './fixtures/avatar.html';
import './index';
import { avatarSize } from './index';

export default {
  title: 'Components/Avatar',
};

addons.getChannel().addListener(DOCS_RENDERED, (name: string) => {
  if (name.toLowerCase().startsWith('components/avatar')) {
    const myAvatar40 = document.getElementById('my-avatar-40') as HTMLElement;
    if (myAvatar40) {
      avatarSize.setValueFor(myAvatar40, 40);
    }
    const myAvatar72 = document.getElementById('my-avatar-72') as HTMLElement;
    if (myAvatar72) {
      avatarSize.setValueFor(myAvatar72, 72);
    }
    const avatar20 = document.getElementById('avatar-20') as HTMLElement;
    if (avatar20) {
      avatarSize.setValueFor(avatar20, 20);
    }
    const avatar24 = document.getElementById('avatar-24') as HTMLElement;
    if (avatar24) {
      avatarSize.setValueFor(avatar24, 24);
    }
    const avatar28 = document.getElementById('avatar-28') as HTMLElement;
    if (avatar28) {
      avatarSize.setValueFor(avatar28, 28);
    }
    const avatar32 = document.getElementById('avatar-32') as HTMLElement;
    if (avatar32) {
      avatarSize.setValueFor(avatar32, 32);
    }
    const avatar36 = document.getElementById('avatar-36') as HTMLElement;
    if (avatar36) {
      avatarSize.setValueFor(avatar36, 36);
    }
    const avatar40 = document.getElementById('avatar-40') as HTMLElement;
    if (avatar40) {
      avatarSize.setValueFor(avatar40, 40);
    }
    const avatar48 = document.getElementById('avatar-48') as HTMLElement;
    if (avatar48) {
      avatarSize.setValueFor(avatar48, 48);
    }
    const avatar56 = document.getElementById('avatar-56') as HTMLElement;
    if (avatar56) {
      avatarSize.setValueFor(avatar56, 56);
    }
    const avatar64 = document.getElementById('avatar-64') as HTMLElement;
    if (avatar64) {
      avatarSize.setValueFor(avatar64, 64);
    }
    const avatar72 = document.getElementById('avatar-72') as HTMLElement;
    if (avatar72) {
      avatarSize.setValueFor(avatar72, 72);
    }
    const avatar96 = document.getElementById('avatar-96') as HTMLElement;
    if (avatar96) {
      avatarSize.setValueFor(avatar96, 96);
    }
  }
});

export const avatar = () => AvatarTemplate;
