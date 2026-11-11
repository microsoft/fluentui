import * as React from 'react';
import '@testing-library/jest-dom';
import { Tooltip } from './Tooltip';
import type { TooltipChildProps } from './Tooltip.types';
import { isConformant } from '../../testing/isConformant';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import type { PositioningVirtualElement } from '@fluentui/react-positioning';
import type { RenderResult } from '@testing-library/react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { resetIdsForTests, SSRProvider } from '@fluentui/react-utilities';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleTooltip(result: RenderResult) {
  const tooltips = result.baseElement.querySelectorAll('*[role="tooltip"]');
  if (!tooltips?.length) {
    return null;
  } else {
    expect(tooltips.length).toBe(1);
    return tooltips.item(0) as HTMLElement;
  }
}

// testing-library's getByRole function doesn't look inside portals
function getByRoleTooltip(result: RenderResult) {
  const tooltip = queryByRoleTooltip(result);
  expect(tooltip).not.toBeNull();
  return tooltip!;
}

export const getTooltipElement: IsConformantOptions['getTargetElement'] = (result, attr) => {
  return queryByRoleTooltip(result)!;
};

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: { content: 'Example', children: <button />, visible: true },
    getTargetElement: getTooltipElement,
    disabledTests: [
      // Tooltip renders into a Portal, which confuses these tests
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
    ],
    testOptions: {
      'has-static-classnames': [{ props: { secondaryContent: 'Ctrl+B' } }],
      'consistent-callback-args': {
        legacyCallbacks: ['onVisibleChange'],
      },
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  describe('secondary content', () => {
    it.each([
      ['label', 'aria-labelledby', true, 'Bold'],
      ['label', 'aria-labelledby', 'true', <strong key="primary">Bold</strong>],
      ['description', 'aria-describedby', true, 'Bold'],
      ['description', 'aria-describedby', 'true', <strong key="primary">Bold</strong>],
    ] as const)(
      'routes the %s %s reference around aria-hidden=%p secondary content',
      (relationship, attribute, ariaHidden, content) => {
        const example = (visible: boolean) => (
          <Tooltip
            visible={visible}
            content={{ id: 'tooltip', children: content }}
            secondaryContent={{ id: 'shortcut', children: 'Ctrl+B', 'aria-hidden': ariaHidden }}
            relationship={relationship}
          >
            <button>{relationship === 'description' ? 'Format' : null}</button>
          </Tooltip>
        );
        const result = render(example(false));

        for (const visible of [false, true, false]) {
          result.rerender(example(visible));
          const trigger = result.getByRole('button', {
            name: relationship === 'label' ? 'Bold' : 'Format',
            description: relationship === 'description' ? 'Bold' : '',
          });
          const tooltip = getByRoleTooltip(result);
          const referencedContent = tooltip.ownerDocument.getElementById(trigger.getAttribute(attribute)!);
          expect(referencedContent).toHaveTextContent('Bold');
          expect(referencedContent).not.toContainElement(result.getByText('Ctrl+B'));
          expect(tooltip).toHaveAttribute('id', 'tooltip');
          expect(tooltip).toContainElement(referencedContent);
          expect(result.getByText('Ctrl+B')).toHaveAttribute('id', 'shortcut');
        }
      },
    );

    it('updates the generated reference when secondary aria-hidden changes', () => {
      const example = (ariaHidden: React.AriaAttributes['aria-hidden']) => (
        <Tooltip
          content="Bold"
          secondaryContent={{ children: 'Ctrl+B', 'aria-hidden': ariaHidden }}
          relationship="label"
        >
          <button />
        </Tooltip>
      );
      const result = render(example(true));
      for (const ariaHidden of [true, false, 'true', 'false', undefined] as const) {
        result.rerender(example(ariaHidden));
        const hidden = ariaHidden === true || ariaHidden === 'true';
        const trigger = result.getByRole('button', { name: hidden ? 'Bold' : 'Bold Ctrl+B' });
        const tooltip = getByRoleTooltip(result);
        expect(trigger.getAttribute('aria-labelledby') === tooltip.id).toBe(!hidden);
      }
    });

    it.each(['Ctrl+B', <kbd key="shortcut">Ctrl+B</kbd>])(
      'combines labels using rendered content %p',
      secondaryContent => {
        const result = render(
          <Tooltip content="Bold" secondaryContent={secondaryContent} relationship="label">
            <button />
          </Tooltip>,
        );
        expect(result.getByRole('button', { name: 'Bold Ctrl+B' })).toBeTruthy();
        expect(result.getByRole('button')).toHaveAttribute('aria-labelledby', getByRoleTooltip(result).id);
      },
    );

    it('combines descriptions without replacing the trigger name', () => {
      const result = render(
        <Tooltip
          content={<strong>Shared</strong>}
          secondaryContent={<span>Everyone in your organization</span>}
          relationship="description"
        >
          <button>Sharing settings</button>
        </Tooltip>,
      );
      expect(
        result.getByRole('button', {
          name: 'Sharing settings',
          description: 'Shared Everyone in your organization',
        }),
      ).toBeTruthy();
    });

    it.each(['Ctrl+B', <kbd key="shortcut">Ctrl+B</kbd>])('preserves authored names with %p', secondaryContent => {
      const result = render(
        <>
          <span id="authored-name">Authored name</span>
          <Tooltip content="Bold" secondaryContent={secondaryContent} relationship="label">
            <button aria-label="Toggle bold formatting" />
          </Tooltip>
          <Tooltip content="Bold" secondaryContent={secondaryContent} relationship="label">
            <button aria-labelledby="authored-name" />
          </Tooltip>
        </>,
      );
      expect(result.getByRole('button', { name: 'Toggle bold formatting' })).not.toHaveAttribute('aria-labelledby');
      expect(result.getByRole('button', { name: 'Authored name' })).toHaveAttribute('aria-labelledby', 'authored-name');
    });

    it.each(['aria-labelledby', 'aria-describedby'] as const)(
      'keeps closed content referenced by an authored %s',
      attribute => {
        const result = render(
          <Tooltip
            content={{ id: 'tooltip-help', children: <strong>Bold</strong> }}
            secondaryContent="Ctrl+B"
            relationship="label"
          >
            <button
              aria-label={attribute === 'aria-describedby' ? 'Toggle formatting' : undefined}
              {...{ [attribute]: 'tooltip-help' }}
            />
          </Tooltip>,
        );
        expect(
          result.getByRole('button', {
            name: attribute === 'aria-labelledby' ? 'Bold Ctrl+B' : 'Toggle formatting',
            description: attribute === 'aria-describedby' ? 'Bold Ctrl+B' : '',
          }),
        ).toHaveAttribute(attribute, getByRoleTooltip(result).id);
      },
    );

    it.each(['aria-labelledby', 'aria-describedby'] as const)(
      'recognizes authored whitespace-separated %s tokens',
      attribute => {
        const reference = 'authored-reference\t tooltip-help\n';
        const result = render(
          <>
            <span id="authored-reference">Authored text</span>
            <Tooltip
              content={{ id: 'tooltip-help', children: <strong>Bold</strong> }}
              secondaryContent="Ctrl+B"
              relationship="label"
            >
              <button {...{ [attribute]: reference }} />
            </Tooltip>
          </>,
        );
        expect(getByRoleTooltip(result)).toHaveAttribute('id', 'tooltip-help');
        expect(result.getByRole('button')).toHaveAttribute(attribute, reference);
      },
    );

    it('conservatively mounts closed content without changing an external authored description', () => {
      const result = render(
        <>
          <span id="tooltip-help-other">Authored description</span>
          <Tooltip
            content={{ id: 'tooltip-help', children: <strong>Bold</strong> }}
            secondaryContent="Ctrl+B"
            relationship="label"
          >
            <button aria-label="Toggle formatting" aria-describedby="tooltip-help-other" />
          </Tooltip>
        </>,
      );
      expect(
        result.getByRole('button', { name: 'Toggle formatting', description: 'Authored description' }),
      ).toHaveAttribute('aria-describedby', 'tooltip-help-other');
      const tooltip = getByRoleTooltip(result);
      expect(tooltip).toContainElement(result.getByText('Bold'));
      expect(tooltip).not.toBeVisible();
    });

    it.each([
      ['summary', false, false],
      ['summary', true, false],
      ['summary', false, true],
      ['summary', true, true],
      ['shortcut', false, true],
      ['shortcut', true, true],
    ] as const)(
      'preserves the authored descendant label %s with visible=%p and secondary content=%p',
      (targetId, visible, withSecondaryContent) => {
        const result = render(
          <Tooltip
            visible={visible}
            content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
            secondaryContent={withSecondaryContent ? { id: 'shortcut', children: 'Ctrl+B' } : undefined}
            relationship="label"
          >
            <button aria-labelledby={targetId} />
          </Tooltip>,
        );
        const expectedName = targetId === 'summary' ? 'Bold' : 'Ctrl+B';
        expect(result.getByRole('button', { name: expectedName })).toHaveAttribute('aria-labelledby', targetId);
        expect(getByRoleTooltip(result)).toContainElement(result.getByText(expectedName));
      },
    );

    it.each([
      ['summary', false],
      ['summary', true],
      ['shortcut', false],
      ['shortcut', true],
    ] as const)(
      'preserves the authored descendant description %s for a named label trigger with visible=%p',
      (targetId, visible) => {
        const result = render(
          <Tooltip
            visible={visible}
            content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
            secondaryContent={{ id: 'shortcut', children: 'Ctrl+B' }}
            relationship="label"
          >
            <button aria-label="Toggle formatting" aria-describedby={targetId} />
          </Tooltip>,
        );
        const expectedDescription = targetId === 'summary' ? 'Bold' : 'Ctrl+B';
        expect(
          result.getByRole('button', { name: 'Toggle formatting', description: expectedDescription }),
        ).toHaveAttribute('aria-describedby', targetId);
        expect(getByRoleTooltip(result)).toContainElement(result.getByText(expectedDescription));
      },
    );

    it.each([
      ['aria-labelledby', 'summary'],
      ['aria-labelledby', 'shortcut'],
      ['aria-describedby', 'summary'],
      ['aria-describedby', 'shortcut'],
    ] as const)('preserves a render-function %s targeting descendant %s', (attribute, targetId) => {
      const result = render(
        <Tooltip
          content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
          secondaryContent={{ id: 'shortcut', children: 'Ctrl+B' }}
          relationship="label"
        >
          {triggerProps =>
            React.createElement('button', {
              ...triggerProps,
              'aria-label': attribute === 'aria-describedby' ? 'Toggle formatting' : undefined,
              [attribute]: targetId,
            })
          }
        </Tooltip>,
      );
      const expectedText = targetId === 'summary' ? 'Bold' : 'Ctrl+B';
      expect(
        result.getByRole('button', {
          name: attribute === 'aria-labelledby' ? expectedText : 'Toggle formatting',
          description: attribute === 'aria-describedby' ? expectedText : '',
        }),
      ).toHaveAttribute(attribute, targetId);
      expect(getByRoleTooltip(result)).toContainElement(result.getByText(expectedText));
    });

    it.each(['', ' \t\n '])('does not mount unused content for empty authored references %p', reference => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
          <button aria-label="Toggle formatting" aria-labelledby={reference} aria-describedby={reference} />
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Toggle formatting' })).toHaveAttribute('aria-labelledby', reference);
      expect(queryByRoleTooltip(result)).toBeNull();
    });

    it.each(['', ' \t\n '])('does not mount unused content for empty render-function references %p', reference => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
          {triggerProps =>
            React.createElement('button', {
              ...triggerProps,
              'aria-label': 'Toggle formatting',
              'aria-labelledby': reference,
              'aria-describedby': reference,
            })
          }
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Toggle formatting' })).toHaveAttribute('aria-labelledby', reference);
      expect(queryByRoleTooltip(result)).toBeNull();
    });

    it.each([undefined, null])('preserves authored ID references without secondary content=%p', secondaryContent => {
      const result = render(
        <Tooltip
          content={{ id: 'tooltip-help', children: <strong>Bold</strong> }}
          secondaryContent={secondaryContent}
          relationship="label"
        >
          <button aria-labelledby="tooltip-help" />
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Bold' })).toHaveAttribute(
        'aria-labelledby',
        getByRoleTooltip(result).id,
      );
    });

    it('preserves an authored description reference', () => {
      const result = render(
        <>
          <span id="authored-description">Authored description</span>
          <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="description">
            <button aria-describedby="authored-description">Bold</button>
          </Tooltip>
        </>,
      );
      expect(result.getByRole('button', { description: 'Authored description' })).toBeTruthy();
    });

    it.each([false, true])('preserves a primary descendant description with visible=%p', visible => {
      const result = render(
        <Tooltip
          visible={visible}
          content={{ id: 'tooltip', children: <span id="summary">Bold</span> }}
          secondaryContent="Ctrl+B"
          relationship="description"
        >
          <button aria-describedby="summary">Format</button>
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Format', description: 'Bold' })).toHaveAttribute(
        'aria-describedby',
        'summary',
      );
      expect(getByRoleTooltip(result)).toContainElement(result.getByText('Bold'));
    });

    it.each([false, true])('preserves a secondary slot description with visible=%p', visible => {
      const result = render(
        <Tooltip
          visible={visible}
          content={{ id: 'tooltip', children: 'Bold' }}
          secondaryContent={{ id: 'shortcut', children: 'Ctrl+B' }}
          relationship="description"
        >
          <button aria-describedby="shortcut">Format</button>
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Format', description: 'Ctrl+B' })).toHaveAttribute(
        'aria-describedby',
        'shortcut',
      );
      expect(getByRoleTooltip(result)).toContainElement(result.getByText('Ctrl+B'));
    });

    it.each(['Ctrl+B', <kbd key="shortcut">Ctrl+B</kbd>, { children: 'Ctrl+B', 'aria-hidden': true }])(
      'preserves an authored render-function label with %p',
      secondaryContent => {
        const onFocus = jest.fn();
        const renderTrigger = jest.fn((triggerProps: TooltipChildProps) =>
          React.createElement('button', {
            ...triggerProps,
            'aria-label': 'Toggle bold formatting',
            onFocus: (event: React.FocusEvent<HTMLButtonElement>) => {
              triggerProps.onFocus?.(event);
              onFocus();
            },
          }),
        );
        const result = render(
          <Tooltip content="Bold" secondaryContent={secondaryContent} relationship="label">
            {renderTrigger}
          </Tooltip>,
        );
        const trigger = result.getByRole('button', { name: 'Toggle bold formatting' });
        expect(trigger).not.toHaveAttribute('aria-labelledby');
        expect(renderTrigger).toHaveBeenCalledTimes(1);
        expect(queryByRoleTooltip(result)).toBeNull();
        expect(renderTrigger.mock.calls[0][0].ref).toBeTruthy();
        fireEvent.focus(trigger);
        expect(onFocus).toHaveBeenCalledTimes(1);
      },
    );

    it('labels an unnamed render-function trigger using both content regions', () => {
      const result = render(
        <Tooltip content="Bold" secondaryContent={<kbd>Ctrl+B</kbd>} relationship="label">
          {triggerProps => React.createElement('button', triggerProps)}
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Bold Ctrl+B' })).toHaveAttribute(
        'aria-labelledby',
        getByRoleTooltip(result).id,
      );
    });

    it('keeps content referenced by an authored render-function description', () => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
          {triggerProps =>
            React.createElement('button', {
              ...triggerProps,
              'aria-label': 'Toggle bold formatting',
              'aria-describedby': triggerProps['aria-labelledby'],
            })
          }
        </Tooltip>,
      );
      expect(
        result.getByRole('button', { name: 'Toggle bold formatting', description: 'Bold Ctrl+B' }),
      ).toHaveAttribute('aria-describedby', getByRoleTooltip(result).id);
    });

    it.each([false, true])('preserves authored render-function references (composed=%p)', composed => {
      const result = render(
        <>
          <span id="authored-name">Authored name</span>
          <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
            {triggerProps =>
              React.createElement('button', {
                ...triggerProps,
                'aria-label': 'Toggle bold formatting',
                'aria-labelledby': composed ? `authored-name ${triggerProps['aria-labelledby']}` : 'authored-name',
              })
            }
          </Tooltip>
        </>,
      );
      expect(
        result.getByRole('button', { name: composed ? 'Authored name Bold Ctrl+B' : 'Authored name' }),
      ).toHaveAttribute('aria-labelledby', composed ? `authored-name ${getByRoleTooltip(result).id}` : 'authored-name');
    });

    it('supports a render function returning null', () => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
          {() => null}
        </Tooltip>,
      );
      expect(result.queryByRole('button')).toBeNull();
    });

    it.each(['description', 'inaccessible'] as const)('preserves render-function %s relationships', relationship => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship={relationship}>
          {triggerProps => React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' })}
        </Tooltip>,
      );
      const trigger = result.getByRole('button', {
        name: 'Toggle bold formatting',
        description: relationship === 'description' ? 'Bold Ctrl+B' : '',
      });
      expect(trigger).not.toHaveAttribute('aria-labelledby');
    });

    it('preserves authored render-function labels without secondary content', () => {
      const result = render(
        <Tooltip content="Bold" relationship="label">
          {triggerProps => React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' })}
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Toggle bold formatting' })).not.toHaveAttribute('aria-labelledby');
      expect(queryByRoleTooltip(result)).toBeNull();
    });

    it('supports slot props and preserves the arrow outside the text layout', () => {
      const ref = React.createRef<HTMLSpanElement>();
      const result = render(
        <Tooltip
          visible
          withArrow
          content="Bold"
          secondaryContent={{ children: 'Ctrl+B', className: 'custom-secondary', ref, lang: 'en' }}
          relationship="label"
        >
          <button />
        </Tooltip>,
      );
      const tooltip = getByRoleTooltip(result);
      expect(ref.current).toHaveClass('fui-Tooltip__secondaryContent', 'custom-secondary');
      expect(ref.current).toHaveAttribute('lang', 'en');
      expect(tooltip.children).toHaveLength(2);
      expect(tooltip.lastElementChild).toContainElement(ref.current);
    });

    it.each([undefined, null])('preserves the original content DOM with secondaryContent=%p', secondaryContent => {
      const result = render(
        <Tooltip visible content="Bold" secondaryContent={secondaryContent} relationship="label">
          <button />
        </Tooltip>,
      );
      const tooltip = getByRoleTooltip(result);
      expect(tooltip.childNodes).toHaveLength(1);
      expect(tooltip.firstChild?.nodeType).toBe(Node.TEXT_NODE);
      expect(result.getByRole('button')).toHaveAttribute('aria-label', 'Bold');
    });

    it('supports empty secondary text without changing the accessible name', () => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="" relationship="label">
          <button />
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Bold' })).toBeTruthy();
    });

    it('does not create naming attributes for an inaccessible tooltip', () => {
      const result = render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="inaccessible">
          <button>Authored name</button>
        </Tooltip>,
      );
      expect(result.getByRole('button', { name: 'Authored name' })).toBeTruthy();
      expect(result.getByRole('button')).not.toHaveAttribute('aria-labelledby');
      expect(result.getByRole('button')).not.toHaveAttribute('aria-describedby');
      expect(queryByRoleTooltip(result)).toBeNull();
    });

    it.each(['label', 'description'] as const)(
      'keeps %s references valid while an expanded popup suppresses visibility',
      relationship => {
        const result = render(
          <Tooltip visible content="Bold" secondaryContent="Ctrl+B" relationship={relationship}>
            <button aria-haspopup="menu" aria-expanded />
          </Tooltip>,
        );
        const tooltip = getByRoleTooltip(result);
        expect(getComputedStyle(tooltip).display).toBe('none');
        expect(result.getByRole('button')).toHaveAttribute(
          relationship === 'label' ? 'aria-labelledby' : 'aria-describedby',
          tooltip.id,
        );
      },
    );

    it.each(['label', 'description'] as const)('preserves no-slot expanded-popup DOM for %s', relationship => {
      const result = render(
        <Tooltip visible content={<strong>Bold</strong>} relationship={relationship}>
          <button aria-haspopup="menu" aria-expanded />
        </Tooltip>,
      );
      expect(queryByRoleTooltip(result)).toBeNull();
    });

    it('hydrates a server label before using the rendered secondary content', () => {
      const container = document.createElement('div');
      container.innerHTML = '<button aria-label="Bold Ctrl+B">Trigger</button>';
      document.body.appendChild(container);
      const onError = jest.spyOn(console, 'error');
      const result = render(
        <SSRProvider>
          <Tooltip
            content={{ children: 'Bold', id: 'hydrated-tooltip' }}
            secondaryContent="Ctrl+B"
            relationship="label"
          >
            <button>Trigger</button>
          </Tooltip>
        </SSRProvider>,
        { container, hydrate: true },
      );
      expect(result.getByRole('button', { name: 'Bold Ctrl+B' })).toBeTruthy();
      expect(result.getByRole('button')).toHaveAttribute('aria-labelledby', 'hydrated-tooltip');
      expect(onError).not.toHaveBeenCalled();
      onError.mockRestore();
    });
  });

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    const result = render(
      <Tooltip content={tooltipText} relationship="label">
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const tooltip = queryByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(tooltip).toBeNull();
    expect(target.getAttribute('aria-label')).toBe(tooltipText);
  });

  it('renders the content of a nontrivial label tooltip', () => {
    const result = render(
      <Tooltip
        relationship="label"
        content={{
          children: (
            <span>
              This is a <strong>formatted</strong> tooltip
            </span>
          ),
          id: 'the-tooltip-id',
        }}
      >
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(tooltip.id).toBe('the-tooltip-id');
    expect(target.getAttribute('aria-labelledby')).toBe('the-tooltip-id');
  });

  it('renders a description tooltip content always', () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);
  });

  it("doesn't set any aria attributes for relationship='inaccessible'", () => {
    const result = render(
      <Tooltip content="Inaccessible tooltip" relationship="inaccessible">
        <button />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.hasAttribute('aria-label')).toBe(false);
    expect(target.hasAttribute('aria-labelledby')).toBe(false);
    expect(target.hasAttribute('aria-description')).toBe(false);
    expect(target.hasAttribute('aria-describedby')).toBe(false);
  });

  it("doesn't override trigger's aria-label", () => {
    const result = render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-label="test-label" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-label')).toBe('test-label');
    expect(target.getAttribute('aria-labelledby')).toBe(null);
  });

  it("doesn't override trigger's aria-labelledby", () => {
    const result = render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-labelledby="test-labelledby" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-labelledby')).toBe('test-labelledby');
  });

  it("doesn't override trigger's aria-describedby", () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button aria-describedby="test-describedby" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-description')).toBe(null);
    expect(target.getAttribute('aria-describedby')).toBe('test-describedby');
  });

  it('hides the tooltip when the document becomes hidden (e.g. tab backgrounded on mobile)', () => {
    const onVisibleChange = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible onVisibleChange={onVisibleChange}>
        <button />
      </Tooltip>,
    );

    // Tooltip starts visible
    expect(queryByRoleTooltip(result)).not.toBeNull();

    // Simulate the tab being backgrounded / app switched on mobile
    const visibilityStateSpy = jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    act(() => {
      fireEvent(document, new Event('visibilitychange'));
    });

    expect(onVisibleChange).toHaveBeenCalledWith(undefined, expect.objectContaining({ visible: false }));

    visibilityStateSpy.mockRestore();
  });

  it('remains visible when positioning geometry is unavailable', async () => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());

    expect(onPositioningEnd.mock.calls.at(-1)?.[0].detail).toEqual(
      expect.objectContaining({ escaped: false, referenceHidden: false }),
    );
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
  });

  it.each([
    { escaped: false, referenceHidden: false },
    { escaped: true, referenceHidden: false },
    { escaped: false, referenceHidden: true },
    { escaped: true, referenceHidden: true },
  ])('follows reference visibility for positioning flags %o', flags => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', ...flags },
    });
    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility === 'hidden').toBe(flags.referenceHidden);
    if (flags.referenceHidden) {
      expect(getComputedStyle(tooltip).pointerEvents).toBe('none');
    }
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);

    const visibleEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: flags.escaped, referenceHidden: false },
    });
    act(() => tooltip.dispatchEvent(visibleEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
    expect(onPositioningEnd).toHaveBeenCalledTimes(2);
    expect(onPositioningEnd).toHaveBeenLastCalledWith(visibleEvent);
  });

  it('hides when positioning reports an explicit DOM target as hidden', () => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip
        content="Tooltip content"
        relationship="label"
        visible
        positioning={{ target: document.body, onPositioningEnd }}
      >
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);
    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: false, referenceHidden: true },
    });

    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getComputedStyle(tooltip).visibility).toBe('hidden');
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);
  });

  it('remains visible when positioning reports a virtual target as hidden', () => {
    const onPositioningEnd = jest.fn();
    const virtualTarget: PositioningVirtualElement = {
      getBoundingClientRect: () => new DOMRect(),
    };
    const result = render(
      <Tooltip
        content="Tooltip content"
        relationship="label"
        visible
        positioning={{ target: virtualTarget, onPositioningEnd }}
      >
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);
    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: false, referenceHidden: true },
    });

    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);
  });
});
