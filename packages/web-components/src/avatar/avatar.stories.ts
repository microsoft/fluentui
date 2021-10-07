import { fluentAvatar } from './index';

export default {
  title: 'Components/Avatar',
  component: fluentAvatar,
  argTypes: {
    shape: {
      options: ['circle', 'square'],
      control: { type: 'radio' },
    },
    badge: {
      options: ['on', 'off'],
      control: { type: 'boolean' },
    },
  },
};

const AvatarTemplate = ({ badge, shape, label }) => `
  <style>
    fluent-avatar {
      --avatar-fill-accent-primary: #cf4073;
      --avatar-color-light: hsl(0, 0%, 100%);
      --badge-fill-primary: var(--accent-fill-rest);
    }
    fluent-badge {
      right: -4px;
      bottom: -4px;
    }
    fluent-badge::part(control) {
      width: 4px;
      height: 8px;
    }
  </style>
  <fluent-avatar
    ${shape ? `shape="${shape}"` : ''}
    fill='accent-primary'
    color='light'
  >
    ${label}
    ${badge ? '<fluent-badge slot="badge" fill="primary" circular></fluent-badge>' : ''}
  </fluent-avatar>`;

export const Avatar = AvatarTemplate.bind({});

Avatar.args = {
  label: 'CR',
  shape: 'circle',
  badge: false,
};

Avatar.parameters = {
  docs: {
    source: {
      code: `
<style>
  fluent-avatar {
    --avatar-fill-accent-primary: #cf4073;
    --avatar-color-light: hsl(0, 0%, 100%);
  }
</style>
<fluent-avatar shape='circle' fill='accent-primary' color='light'>CR</fluent-avatar>
      `,
    },
  },
};
