import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, testRunner, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';
declare var casper: Casper;
let componentIds: IRunVisualTest[] = [];

componentIds.push({
  selector: '.' + 'Rating',
  fileName: 'rating',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'RatingLarge',
  fileName: 'ratingLarge',
  commands: [defaultScreenshot]
});

componentIds.push({
  selector: '.' + 'ms-Rating-star',
  imageSelector: '.' + 'Rating',
  fileName: 'rating',
  commands: [mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot]
});

componentIds.push({
  selector: '.' + 'ms-Rating-star',
  imageSelector: '.' + 'RatingLarge',
  fileName: 'ratingLarge',
  commands: [mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot]
});
componentIds.push({
  selector: '.' + 'RatingDisabled',
  fileName: 'ratingDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'rating').
  then(() => {
    testRunner(componentIds);
  });

casper.run(() => { casper.test.done(); });