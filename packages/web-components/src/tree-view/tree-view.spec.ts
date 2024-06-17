import './tree-view.js';
import '../tree-item/tree-item.js';
import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { fixtureURL } from '../helpers.tests.js';

test.describe('<tree-view> and <tree-item>', () => {
  let page: Page;
  let element: Locator;
  let root: Locator;
  let treeItems: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    element = page.locator('fluent-tree-view');

    root = page.locator('#root');

    treeItems = element.locator('fluent-tree-item');

    await page.goto(fixtureURL('components-treeview--tree-view'));
  });

  test.afterAll(async () => {
    await page.close();
  });
  test.only('should work with basic rendering', async () => {
    await root.evaluate(node => {
      node.innerHTML = /*html*/ `
      <fluent-tree-view>
        <fluent-tree-item>Item 1</fluent-tree-item>
        <fluent-tree-item>Item 2</fluent-tree-item>
        <fluent-tree-item>Item 3</fluent-tree-item>
      </fluent-tree-view>
    `;
    });
    const treeView = page.locator('fluent-tree-view');
    const treeItems = page.locator('fluent-tree-item');
    expect(treeView).toHaveCount(1);
    expect(treeItems).toHaveCount(3);
    expect(treeItems.nth(0)).toHaveText('Item 1');
    expect(treeItems.nth(1)).toHaveText('Item 2');
    expect(treeItems.nth(2)).toHaveText('Item 3');
  });

  test('should work with basic rendering - nested', async () => {
    const treeViewEl = await root.evaluate(node => {
      node.innerHTML = `
      <fluent-tree-view>
        <fluent-tree-item>
          Item 1
          <fluent-tree-item>Nested Item A</fluent-tree-item>
        </fluent-tree-item>
        <fluent-tree-item>
          Item 2
          <fluent-tree-item>Nested Item B</fluent-tree-item>
        </fluent-tree-item>
      </fluent-tree-view>
    `;
    });
    const treeView = page.locator('fluent-tree-view');
    const treeItems = page.locator('fluent-tree-item');
    expect(treeView).toHaveCount(1);
    expect(treeView.nth(0).evaluate(node => node.children.length)).toBe(2);
    // nested structure
  });

  // it('works with size variants', async () => {
  //   const treeViewEl = await fixture(`
  //     <fluent-tree-view size='small'>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl.children.length).to.equal(1);
  //   expect(treeViewEl.children[0].classList.contains('small')).to.equal(true);
  //   expect(treeViewEl.children[0].clientHeight).to.equal(24);

  //   const treeViewEl2 = await fixture(`
  //     <fluent-tree-view size='medium'>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl2.children.length).to.equal(1);
  //   expect(treeViewEl2.children[0].classList.contains('medium')).to.equal(true);
  //   expect(treeViewEl2.children[0].clientHeight).to.equal(32);
  // });

  // it('works with appearance variants', async () => {
  //   const treeViewEl = await fixture(`
  //     <fluent-tree-view>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl.children.length).to.equal(1);
  //   expect(treeViewEl.children[0].classList.contains('subtle')).to.equal(true);

  //   const treeViewEl2 = await fixture(`
  //     <fluent-tree-view appearance='subtle-alpha'>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl2.children.length).to.equal(1);
  //   expect(treeViewEl2.children[0].classList.contains('subtle-alpha')).to.equal(true);

  //   const treeViewEl3 = await fixture(`
  //     <fluent-tree-view appearance='transparent'>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl3.children.length).to.equal(1);
  //   expect(treeViewEl3.children[0].classList.contains('transparent')).to.equal(true);
  // });

  // it('should expand the item when clicking on it', async () => {
  //   const treeViewEl = await fixture(`
  //     <fluent-tree-view>
  //       <fluent-tree-item>
  //         Item 1
  //         <fluent-tree-item>Nested Item A</fluent-tree-item>
  //       </fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl.children.length).to.equal(1);

  //   const treeItem = treeViewEl.children[0] as HTMLElement;
  //   expect(treeItem.hasAttribute('expanded')).to.equal(false);

  //   // expand
  //   treeItem.click();
  //   await nextFrame();
  //   expect(treeItem.hasAttribute('expanded')).to.equal(true);

  //   // collapes
  //   treeItem.click();
  //   await nextFrame();
  //   expect(treeItem.hasAttribute('expanded')).to.equal(false);
  // });

  // it('should work with selection', async () => {
  //   const treeViewEl = await fixture(`
  //     <fluent-tree-view>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //       <fluent-tree-item>Item 2</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   expect(treeViewEl.children.length).to.equal(2);

  //   const treeItem1 = treeViewEl.children[0] as HTMLElement;
  //   const treeItem2 = treeViewEl.children[1] as HTMLElement;
  //   expect(treeItem1.hasAttribute('selected')).to.equal(false);
  //   expect(treeItem2.hasAttribute('selected')).to.equal(false);

  //   // select item 1
  //   treeItem1.click();
  //   await nextFrame();
  //   expect(treeItem1.hasAttribute('selected')).to.equal(true);
  //   expect(treeItem2.hasAttribute('selected')).to.equal(false);

  //   // select item 2
  //   treeItem2.click();
  //   await nextFrame();
  //   expect(treeItem1.hasAttribute('selected')).to.equal(false);
  //   expect(treeItem2.hasAttribute('selected')).to.equal(true);
  // });

  // it('should not scroll when pressing space key', async () => {
  //   const scrollTrigger = fake();
  //   document.addEventListener('scroll', scrollTrigger);
  //   const treeViewEl = await fixture(`
  //     <fluent-tree-view>
  //       <fluent-tree-item>Item 1</fluent-tree-item>
  //     </fluent-tree-view>
  //   `);
  //   for (let i = 0; i < 30; i++) {
  //     treeViewEl.appendChild(document.createElement('fluent-tree-item'));
  //   }
  //   expect(treeViewEl.children.length).to.equal(31);

  //   const treeItem1 = treeViewEl.children[0] as HTMLElement;
  //   expect(treeItem1.hasAttribute('selected')).to.equal(false);

  //   treeItem1.focus();
  //   expect(scrollTrigger.callCount).to.equal(0);

  //   await sendKeys({ press: 'Space' });
  //   await Updates.next();

  //   expect(treeItem1.hasAttribute('selected')).to.equal(true);
  //   expect(scrollTrigger.callCount).to.equal(0);
  // });
});
