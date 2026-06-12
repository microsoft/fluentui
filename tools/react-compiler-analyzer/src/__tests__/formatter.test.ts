import { createFormatter, escapeHtml, renderHtmlDocument, type Formatter } from '../formatter';
import type { OutputFormat } from '../types';

/** Render a fixed sequence of formatter calls and capture the emitted lines. */
function render(format: OutputFormat, body: (f: Formatter) => void): string {
  const lines: string[] = [];
  const f = createFormatter(format, line => lines.push(line));
  body(f);
  return lines.join('\n');
}

describe('createFormatter', () => {
  it('returns a formatter whose `format` matches the requested format', () => {
    expect(createFormatter('cli').format).toBe('cli');
    expect(createFormatter('md').format).toBe('md');
    expect(createFormatter('html').format).toBe('html');
  });
});

describe('escapeHtml', () => {
  it('escapes the five HTML-sensitive characters', () => {
    expect(escapeHtml(`<a href="x" title='y'> & </a>`)).toBe(
      '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt; &amp; &lt;/a&gt;',
    );
  });
});

describe('CliFormatter', () => {
  it('renders headings, tables and notes as aligned plain text', () => {
    const out = render('cli', f => {
      f.heading(1, 'Title');
      f.heading(3, 'Section');
      f.table(['Name', 'Count'], [['alpha', 1]]);
      f.line('- **bold** item');
      f.line('> a note');
    });

    expect(out).toMatchInlineSnapshot(`
      "Title
      ═════
      ▸ Section
      Name   Count
      ─────  ─────
      alpha  1
      - bold item
        a note"
    `);
  });
});

describe('MarkdownFormatter', () => {
  it('renders GitHub-flavored markdown', () => {
    const out = render('md', f => {
      f.heading(2, 'Section');
      f.table(['Name', 'Count'], [['alpha', 1]]);
      f.line('- **bold** item');
    });

    expect(out).toMatchInlineSnapshot(`
      "## Section
      | Name | Count |
      |------|-------|
      | alpha | 1 |
      - **bold** item"
    `);
  });
});

describe('HtmlFormatter', () => {
  it('renders HTML elements with escaping and inline emphasis', () => {
    const out = render('html', f => {
      f.heading(2, 'Section');
      f.table(['Name', 'Count'], [['<alpha>', 1]]);
      f.line('- **bold** & `code`');
      f.line('> a note');
      f.code('<div>raw</div>');
    });

    expect(out).toMatchInlineSnapshot(`
      "<h2>Section</h2>
      <div class=\\"table-wrap\\"><table><thead><tr><th>Name</th><th>Count</th></tr></thead><tbody><tr><td>&lt;alpha&gt;</td><td>1</td></tr></tbody></table></div>
      <div class=\\"li\\" style=\\"padding-left:0.4rem\\"><strong>bold</strong> &amp; <code>code</code></div>
      <p class=\\"note\\">a note</p>
      <pre class=\\"code\\"><code>&lt;div&gt;raw&lt;/div&gt;</code></pre>"
    `);
  });

  it('renders details blocks', () => {
    const out = render('html', f => {
      f.details('More', () => {
        f.heading(4, 'Inner');
      });
    });

    expect(out).toMatchInlineSnapshot(`
      "<details><summary>More</summary>
      <h4>Inner</h4>
      </details>"
    `);
  });

  it('adds a status class to colored headings', () => {
    const out = render('html', f => {
      f.heading(3, 'Compiled (will be memoized)', 'success');
      f.heading(3, 'Errors (compiler bailout)', 'error');
      f.heading(3, 'Skipped (not a component/hook)', 'warning');
      f.heading(2, 'Migration Candidates', 'info');
    });

    expect(out).toContain('<h3 class="status-success">Compiled (will be memoized)</h3>');
    expect(out).toContain('<h3 class="status-error">Errors (compiler bailout)</h3>');
    expect(out).toContain('<h3 class="status-warning">Skipped (not a component/hook)</h3>');
    expect(out).toContain('<h2 class="status-info">Migration Candidates</h2>');
  });

  it('wraps a status section in a tinted container', () => {
    const out = render('html', f => {
      f.section('success', () => {
        f.heading(3, 'Compiled', 'success');
        f.table(['A'], [['1']]);
      });
    });

    expect(out).toMatchInlineSnapshot(`
      "<section class=\\"status-section status-success\\">
      <h3 class=\\"status-success\\">Compiled</h3>
      <div class=\\"table-wrap\\"><table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table></div>
      </section>"
    `);
  });
});

describe('section passthrough', () => {
  it('cli and md emit section body inline with no wrapper markup', () => {
    const cli = render('cli', f => f.section('success', () => f.line('hi')));
    const md = render('md', f => f.section('error', () => f.line('hi')));

    expect(cli).toBe('hi');
    expect(md).toBe('hi');
  });
});

describe('foldableSection', () => {
  it('html renders a collapsible <details> with count badge, status class and slug id', () => {
    const out = render('html', f => {
      f.foldableSection({ title: 'Compiled but Risky', status: 'warning', count: 4 }, () => {
        f.line('body');
      });
    });

    expect(out).toContain(
      '<details class="fold status-warning" id="compiled-but-risky" data-title="Compiled but Risky" data-count="4">',
    );
    expect(out).toContain('<span class="fold-title">Compiled but Risky</span> <span class="fold-count">4</span>');
    expect(out).toContain('<div class="fold-body">');
    expect(out).toContain('</div></details>');
    // Collapsed by default (no open attribute).
    expect(out).not.toContain('data-count="4" open');
  });

  it('html adds the open attribute when defaultOpen is set', () => {
    const out = render('html', f => {
      f.foldableSection({ title: 'Summary', count: 3, defaultOpen: true }, () => f.line('x'));
    });
    expect(out).toContain('id="summary" data-title="Summary" data-count="3" open>');
  });

  it('html omits the badge when count is undefined', () => {
    const out = render('html', f => {
      f.foldableSection({ title: 'Notes' }, () => f.line('x'));
    });
    expect(out).toContain('<summary><span class="fold-title">Notes</span></summary>');
    expect(out).not.toContain('fold-count');
  });

  it('cli renders a heading with the (N) count, no folding', () => {
    const out = render('cli', f => f.foldableSection({ title: 'Migration Candidates', count: 2 }, () => f.line('x')));
    expect(out).toBe('Migration Candidates (2)\n────────────────────────\n\nx');
  });

  it('md renders a heading with the (N) count, no folding', () => {
    const out = render('md', f => f.foldableSection({ title: 'Errors', count: 5, level: 3 }, () => f.line('x')));
    expect(out).toBe('### Errors (5)\n\nx');
  });

  it('html prefixes the id and emits data-group when grouped, keeping repeated titles unique', () => {
    const out = render('html', f => {
      f.foldableSection({ title: 'Compiled', status: 'success', count: 3, group: '@scope/pkg-a' }, () => f.line('x'));
      f.foldableSection({ title: 'Compiled', status: 'success', count: 9, group: '@scope/pkg-b' }, () => f.line('y'));
    });
    expect(out).toContain('id="scope-pkg-a--compiled" data-title="Compiled" data-group="@scope/pkg-a"');
    expect(out).toContain('id="scope-pkg-b--compiled" data-title="Compiled" data-group="@scope/pkg-b"');
    // The two "Compiled" chapters now have distinct ids.
    expect(out).not.toContain('id="compiled"');
  });

  it('cli/md ignore the group (no id/prefix concept in plain text)', () => {
    const cli = render('cli', f => f.foldableSection({ title: 'Compiled', count: 3, group: 'pkg' }, () => f.line('x')));
    expect(cli).toBe('Compiled (3)\n────────────\n\nx');
  });
});

describe('html table of contents', () => {
  it('injects the sticky TOC element and builder script into the document', () => {
    const doc = renderHtmlDocument('Report', '<details class="fold" id="x" data-title="X" data-count="1"></details>');
    expect(doc).toContain('<nav class="toc" aria-label="Report sections"></nav>');
    expect(doc).toContain("querySelectorAll('details.fold')");
    expect(doc).toContain('On this page');
    expect(doc).toContain('Expand all');
    expect(doc).toContain('Collapse all');
  });

  it('builder script renders a group label when data-group changes and supports scrollspy', () => {
    const doc = renderHtmlDocument('Report', '');
    expect(doc).toContain("getAttribute('data-group')");
    expect(doc).toContain("'toc-group'");
    expect(doc).toContain("'toc-row'");
    expect(doc).toContain("classList.add('active')");
  });

  it('builder script wires a collapse toggle for the whole rail', () => {
    const doc = renderHtmlDocument('Report', '');
    expect(doc).toContain("'toc-toggle'");
    expect(doc).toContain("classList.toggle('collapsed')");
  });
});

describe('status coloring', () => {
  it('md ignores the status argument (no color markup)', () => {
    const out = render('md', f => f.heading(3, 'Compiled', 'success'));
    expect(out).toBe('### Compiled');
  });

  it('cli emits ANSI color when FORCE_COLOR is set', () => {
    // Use variable keys so neither tsconfig (index-signature access) nor eslint (dot-notation) complains.
    const forceKey = 'FORCE_COLOR';
    const noKey = 'NO_COLOR';
    const prev = process.env[forceKey];
    const prevNo = process.env[noKey];
    delete process.env[noKey];
    process.env[forceKey] = '1';
    try {
      const out = render('cli', f => f.heading(3, 'Errors', 'error'));
      // Red SGR (31) around the heading, reset at the end.
      expect(out).toBe('\x1b[31m▸ Errors\x1b[0m');
    } finally {
      if (prev === undefined) {
        delete process.env[forceKey];
      } else {
        process.env[forceKey] = prev;
      }
      if (prevNo !== undefined) {
        process.env[noKey] = prevNo;
      }
    }
  });

  it('cli stays plain when NO_COLOR is set even with a status', () => {
    const out = render('cli', f => f.heading(3, 'Errors', 'error'));
    expect(out).toBe('▸ Errors');
  });
});

describe('renderHtmlDocument', () => {
  it('wraps body content in a self-contained document with an escaped title', () => {
    const doc = renderHtmlDocument('A & B', '<p>hi</p>');

    expect(doc.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(doc).toContain('<title>A &amp; B</title>');
    expect(doc).toContain('<h1 class="banner">A &amp; B</h1>');
    expect(doc).toContain('<style>');
    expect(doc).toContain('<p>hi</p>');
    expect(doc.trimEnd().endsWith('</html>')).toBe(true);
  });
});
