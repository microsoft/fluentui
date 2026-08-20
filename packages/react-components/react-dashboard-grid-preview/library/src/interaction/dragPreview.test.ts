import { createDashboardGridDragPreview, sanitizeDashboardGridDragPreview } from './dragPreview';

describe('dashboard grid drag preview', () => {
  it('sanitizes IDs, ARIA relationships, and focusable descendants', () => {
    const preview = document.createElement('div');
    preview.id = 'duplicate-root';
    const button = document.createElement('button');
    button.id = 'duplicate-button';
    button.setAttribute('aria-describedby', 'duplicate-root');
    preview.appendChild(button);

    sanitizeDashboardGridDragPreview(preview);

    expect(preview.getAttribute('aria-hidden')).toBe('true');
    expect(preview.hasAttribute('inert')).toBe(true);
    expect(preview.hasAttribute('id')).toBe(false);
    expect(button.hasAttribute('id')).toBe(false);
    expect(button.hasAttribute('aria-describedby')).toBe(false);
    expect(button.tabIndex).toBe(-1);
    expect(button.disabled).toBe(true);
  });

  it('creates dedicated preview chrome without cloning active content', () => {
    const active = document.createElement('div');
    active.textContent = 'interactive widget';
    const host = document.createElement('div');
    const preview = createDashboardGridDragPreview({
      targetDocument: document,
      host,
      render: container => {
        container.textContent = 'dedicated preview';
      },
    });

    preview.update({ x: 10, y: 20, width: 100, height: 50 });
    expect(host.contains(preview.element)).toBe(true);
    expect(preview.element.textContent).toContain('dedicated preview');
    expect(preview.element.contains(active)).toBe(false);
    expect(preview.element.style.pointerEvents).toBe('none');

    preview.destroy();
    expect(host.contains(preview.element)).toBe(false);
  });
});
