import { Steps } from 'storywright';

export const tagId = 'tag-id';

export const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#tag-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#tag-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();
