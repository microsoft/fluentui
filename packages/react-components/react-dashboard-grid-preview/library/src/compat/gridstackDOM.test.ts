import {
  getGridStackElement,
  readGridStackDOM,
  readGridStackWidgetAttributes,
  readGridStackWidgetMetadata,
  writeGridStackAttributes,
  writeGridStackWidgetContent,
  writeGridStackWidgetMetadata,
} from './gridstackDOM';
import type { DashboardGridCompatibilityItem, GridStackWidget } from './gridstackTypes';

describe('GridStack DOM compatibility', () => {
  it('reads short attributes safely, strips legacy constraints, and preserves explicit zeroes', () => {
    const element = document.createElement('div');
    element.className = 'grid-stack-item gs-print-hide';
    element.setAttribute('gs-x', '0');
    element.setAttribute('gs-y', '0');
    element.setAttribute('gs-w', '1');
    element.setAttribute('gs-h', '2');
    element.setAttribute('gs-id', 'tile');
    element.setAttribute('gs-no-move', 'true');
    element.setAttribute('gs-no-resize', 'false');
    element.setAttribute('gs-size-to-content', 'false');
    element.setAttribute('gs-min-w', '2');
    element.setAttribute('gs-max-w', 'not-a-number');
    element.setAttribute('gs-page-break', 'true');
    element.setAttribute('gs-print-orientation', 'landscape');
    element.setAttribute('gs-resize-handles', 'e,se');

    expect(readGridStackWidgetAttributes(element)).toEqual({
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      minW: 2,
      noMove: true,
      id: 'tile',
      sizeToContent: false,
      resizeHandles: 'e,se',
      print: {
        pageBreak: true,
        hide: true,
        orientation: 'landscape',
      },
    });
    expect(element.hasAttribute('gs-w')).toBe(false);
    expect(element.hasAttribute('gs-min-w')).toBe(false);
    expect(element.hasAttribute('gs-max-w')).toBe(false);
  });

  it('imports direct items, suffixes duplicate IDs, and treats legacy content as text', () => {
    const root = document.createElement('div');
    root.className = 'grid-stack grid-stack-animate grid-stack-rtl gs-6 gs-print-exact';
    root.setAttribute('gs-min-row', '2');
    root.innerHTML = `
      <div class="grid-stack-item" gs-x="0" gs-y="0" gs-id="duplicate">
        <div class="grid-stack-item-content"><img src="x" onerror="alert(1)"><strong>Safe</strong></div>
      </div>
      <div class="grid-stack-item" gs-x="1" gs-y="0" gs-id="duplicate">
        <div class="grid-stack-item-content">Second</div>
      </div>
      <div class="grid-stack-placeholder grid-stack-item"></div>
    `;

    const imported = readGridStackDOM(root);

    expect(imported.options).toMatchObject({
      columns: 6,
      minRows: 2,
      animate: true,
      direction: 'rtl',
      printMode: 'exact',
    });
    expect(imported.items.map(item => item.id)).toEqual(['duplicate', 'duplicate_1']);
    expect(imported.items[0].content).toBe('Safe');
    expect(imported.items[0].content).not.toContain('<');
  });

  it('imports nested grids recursively without scraping nested HTML as parent content', () => {
    const root = document.createElement('div');
    root.className = 'grid-stack';
    root.innerHTML = `
      <div class="grid-stack-item" gs-id="parent">
        <div class="grid-stack-item-content">
          Parent chrome
          <div class="grid-stack" gs-column="2">
            <div class="grid-stack-item" gs-id="child">
              <div class="grid-stack-item-content">Child</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const imported = readGridStackDOM(root);

    expect(imported.items[0].content).toBeUndefined();
    expect(imported.items[0].subGrid).toMatchObject({
      columns: 2,
      items: [{ id: 'child', content: 'Child' }],
    });
  });

  it('writes GridStack attributes and CSS variables without writing constraints', () => {
    const element = document.createElement('div');
    element.setAttribute('gs-min-w', '2');
    const item: DashboardGridCompatibilityItem = {
      id: 'tile',
      column: 0,
      row: 3,
      columnSpan: 1,
      rowSpan: 2,
      movable: false,
      resizable: true,
      locked: true,
      sizeToContent: false,
      print: { hide: true, pageBreak: true, orientation: 'portrait' },
    };

    writeGridStackAttributes(item, element);

    expect(element.getAttribute('gs-x')).toBe('0');
    expect(element.getAttribute('gs-y')).toBe('3');
    expect(element.getAttribute('gs-w')).toBeNull();
    expect(element.getAttribute('gs-h')).toBe('2');
    expect(element.getAttribute('gs-id')).toBe('tile');
    expect(element.getAttribute('gs-no-move')).toBe('true');
    expect(element.getAttribute('gs-no-resize')).toBeNull();
    expect(element.getAttribute('gs-locked')).toBe('true');
    expect(element.getAttribute('gs-size-to-content')).toBe('false');
    expect(element.getAttribute('gs-min-w')).toBeNull();
    expect(element.style.getPropertyValue('--gs-x')).toBe('0');
    expect(element.style.getPropertyValue('--gs-h')).toBe('2');
    expect(element.classList.contains('gs-print-hide')).toBe(true);
  });

  it('writes content with textContent rather than interpreting HTML', () => {
    const content = document.createElement('div');

    writeGridStackWidgetContent(content, '<img src=x onerror=alert(1)>');

    expect(content.textContent).toBe('<img src=x onerror=alert(1)>');
    expect(content.querySelector('img')).toBeNull();
  });

  it('parses external metadata defensively and writes only data-gs-widget', () => {
    const element = document.createElement('div');
    element.setAttribute('gridstacknode', '{"id":"safe","x":1,"__proto__":{"polluted":true},"_runtime":"discard"}');

    expect(readGridStackWidgetMetadata(element, { consume: true })).toEqual({ id: 'safe', x: 1 });
    expect(element.hasAttribute('gridstacknode')).toBe(false);
    expect((Object.prototype as { polluted?: boolean }).polluted).toBeUndefined();

    const widget: GridStackWidget = { id: 'safe', content: '<b>text</b>' };
    writeGridStackWidgetMetadata(element, widget);
    expect(element.getAttribute('data-gs-widget')).toBe(JSON.stringify(widget));
    expect(element.hasAttribute('gridstacknode')).toBe(false);
  });

  it('resolves numeric IDs and permissive bare class, ID, and gs-id values without selector errors', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <div id="123"></div>
      <div class="bare-class"></div>
      <div gs-id="bare-widget"></div>
    `;
    document.body.appendChild(root);

    expect(getGridStackElement('123', root)?.id).toBe('123');
    expect(getGridStackElement('bare-class', root)?.className).toBe('bare-class');
    expect(getGridStackElement('bare-widget', root)?.getAttribute('gs-id')).toBe('bare-widget');
    expect(getGridStackElement('[', root)).toBeUndefined();

    root.remove();
  });

  it('resolves selectors within an explicit ShadowRoot', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div id="123"></div>
      <div class="shadow-class"></div>
      <div gs-id="shadow-widget"></div>
    `;

    expect(getGridStackElement('123', shadowRoot)?.id).toBe('123');
    expect(getGridStackElement('shadow-class', shadowRoot)?.className).toBe('shadow-class');
    expect(getGridStackElement('shadow-widget', shadowRoot)?.getAttribute('gs-id')).toBe('shadow-widget');
  });
});
