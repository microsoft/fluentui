import SequenceDescription from './SequenceDescription.md';

export { Default } from './SequenceDefault.stories';
export { AlbumScene } from './SequenceAlbumScene.stories';
export { Presence } from './SequencePresence.stories';

export default {
  title: 'Motion/Choreography (preview)/Sequence',
  parameters: {
    docs: {
      description: {
        component: SequenceDescription,
      },
    },
  },
};
