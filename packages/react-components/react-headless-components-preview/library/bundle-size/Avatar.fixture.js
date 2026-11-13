// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  Avatar,
  AvatarContextProvider,
  renderAvatar,
  useAvatar,
  useAvatarContext,
} from '@fluentui/react-headless-components-preview/avatar';

console.log(Avatar, AvatarContextProvider, renderAvatar, useAvatar, useAvatarContext);

export default {
  name: '@fluentui/react-headless-components-preview/avatar',
};
