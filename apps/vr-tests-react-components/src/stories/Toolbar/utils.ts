import { Steps } from 'storywright';

export const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .click('#snooze-toggle')
  .snapshot('Toggle On', { cropTo: '.testWrapper' })
  .mouseDown('#bold-button')
  .snapshot('Button Pressed', { cropTo: '.testWrapper' })
  .end();
