/* eslint-disable @typescript-eslint/naming-convention */
import { cleanFstTokenName } from './cleanFstTokenName';

describe('cleanFstTokenName', () => {
  it('Cleans tokens with brackets', () => {
    expect(cleanFstTokenName('primary/(solid)/(test)/(doubletest)')).toMatch('primary/solid/test/doubletest');
    expect(cleanFstTokenName('background/layer/primary(solid)')).toMatch('background/layer/primary/solid');
    expect(cleanFstTokenName('shadow/card/rest/(key)/(x)/test')).toMatch('shadow/card/rest/key/x/test');
    expect(cleanFstTokenName('CTRL/fab/shadow/rest/(key)')).toMatch('CTRL/fab/shadow/rest/key');
  });

  it('Cleans tokens with dashes', () => {
    expect(cleanFstTokenName('padding/ctrl/horizontal-default')).toMatch('padding/ctrl/horizontal/default');
    expect(cleanFstTokenName('test1-test2-test3')).toMatch('test1/test2/test3');
  });

  it('Cleans tokens with a combination', () => {
    expect(cleanFstTokenName('test/test1-test2(test3)/(test4)/test5')).toMatch('test/test1/test2/test3/test4/test5');
  });
});
