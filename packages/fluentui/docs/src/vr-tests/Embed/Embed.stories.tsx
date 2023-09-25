import { ComponentMeta } from '@storybook/react';
import { Embed } from '@fluentui/react-northstar';
import EmbedExampleVideo from '../../examples/components/Embed/Slots/EmbedExampleVideo.shorthand';
import EmbedExampleYouTube from '../../examples/components/Embed/Usage/EmbedExampleYouTube.shorthand';

export default { component: Embed, title: 'Embed' } as ComponentMeta<typeof Embed>;

export { EmbedExampleVideo, EmbedExampleYouTube };
