const ChiselWebdriverio = require('@mskeros/chisel-webdriverio');

describe('Test index page', function() {
  const chisel = new ChiselWebdriverio.ChiselWebdriverio();
  const scanName = 'scan-index';

  it('should run chisel tests on accessibility university after', async () => {
    await browser.url('https://www.bing.com');
    return chisel.scan(browser, { returnSarif: true }, scanName);
  });

  it('run chisel test on accessibility university before', async () => {
    await browser.url('https://www.washington.edu/accesscomputing/AU/before.html');
    return chisel.scan(browser, { returnSarif: true }, scanName);
  });
});
