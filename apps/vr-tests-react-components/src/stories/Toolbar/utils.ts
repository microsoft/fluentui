import Screener from 'screener-storybook/src/screener';

export const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .click('#snooze-toggle')
  .snapshot('Toggle On', { cropTo: '.testWrapper' })
  .mouseDown('#bold-button')
  .snapshot('Button Pressed', { cropTo: '.testWrapper' })
  .end();
