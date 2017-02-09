var expect = require('chai').expect;
describe('Primary Button', function () {
  it('should have text of Hello There', function () {
    browser.url('http://localhost:9001/?selectedKind=Button&selectedStory=PrimaryButton&full=1');
    var title = browser.getText('.ms-ButtonPrimary');
    expect(title).to.equal("Hello There");
    console.log(title);
  });
});
