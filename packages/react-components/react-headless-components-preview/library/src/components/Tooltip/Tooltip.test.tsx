import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { resetIdsForTests, SSRProvider } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import { Tooltip } from './Tooltip';
import { useTooltip } from './useTooltip';
import { renderTooltip } from './renderTooltip';
import type { TooltipProps, TooltipTriggerProps } from './Tooltip.types';

export const getTooltipElement: IsConformantOptions['getTargetElement'] = () => {
  return screen.queryByRole('tooltip') as HTMLElement;
};

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: {
      content: 'Example tooltip',
      relationship: 'label',
      children: <button aria-label="trigger" />,
      visible: true,
    },
    getTargetElement: getTooltipElement,
    disabledTests: [
      // Tooltip is a wrapper with no root DOM element — ref/className tests don't apply
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onVisibleChange'],
      },
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  describe('secondary content', () => {
    it.each(['Ctrl+B', <kbd key="shortcut">Ctrl+B</kbd>])(
      'combines labels using rendered content %p',
      secondaryContent => {
        render(
          <Tooltip content="Bold" secondaryContent={secondaryContent} relationship="label">
            <button />
          </Tooltip>,
        );
        expect(screen.getByRole('button', { name: 'Bold Ctrl+B' })).toBeTruthy();
        expect(screen.getByRole('button')).toHaveAttribute('aria-labelledby', screen.getByRole('tooltip').id);
      },
    );

    it('combines descriptions without replacing the trigger name', () => {
      render(
        <Tooltip
          content={<strong>Shared</strong>}
          secondaryContent={<span>Everyone in your organization</span>}
          relationship="description"
        >
          <button>Sharing settings</button>
        </Tooltip>,
      );
      expect(
        screen.getByRole('button', {
          name: 'Sharing settings',
          description: 'Shared Everyone in your organization',
        }),
      ).toBeTruthy();
    });

    it.each(['Ctrl+B', <kbd key="shortcut">Ctrl+B</kbd>])('preserves authored names with %p', secondaryContent => {
      render(
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
      expect(screen.getByRole('button', { name: 'Toggle bold formatting' })).not.toHaveAttribute('aria-labelledby');
      expect(screen.getByRole('button', { name: 'Authored name' })).toHaveAttribute('aria-labelledby', 'authored-name');
    });

    it.each(['aria-labelledby', 'aria-describedby'] as const)(
      'keeps closed content referenced by an authored %s',
      attribute => {
        render(
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
          screen.getByRole('button', {
            name: attribute === 'aria-labelledby' ? 'Bold Ctrl+B' : 'Toggle formatting',
            description: attribute === 'aria-describedby' ? 'Bold Ctrl+B' : '',
          }),
        ).toHaveAttribute(attribute, screen.getByRole('tooltip').id);
      },
    );

    it.each(['aria-labelledby', 'aria-describedby'] as const)(
      'recognizes authored whitespace-separated %s tokens',
      attribute => {
        const reference = 'authored-reference\t tooltip-help\n';
        render(
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
        expect(screen.getByRole('tooltip')).toHaveAttribute('id', 'tooltip-help');
        expect(screen.getByRole('button')).toHaveAttribute(attribute, reference);
      },
    );

    it('does not mount closed content for unrelated authored references', () => {
      render(
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
        screen.getByRole('button', { name: 'Toggle formatting', description: 'Authored description' }),
      ).toBeTruthy();
      expect(screen.queryByRole('tooltip')).toBeNull();
    });

    it.each([undefined, null])('preserves authored ID references without secondary content=%p', secondaryContent => {
      render(
        <Tooltip
          content={{ id: 'tooltip-help', children: <strong>Bold</strong> }}
          secondaryContent={secondaryContent}
          relationship="label"
        >
          <button aria-labelledby="tooltip-help" />
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute(
        'aria-labelledby',
        screen.getByRole('tooltip').id,
      );
    });

    it('preserves an authored description reference', () => {
      render(
        <>
          <span id="authored-description">Authored description</span>
          <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="description">
            <button aria-describedby="authored-description">Bold</button>
          </Tooltip>
        </>,
      );
      expect(screen.getByRole('button', { description: 'Authored description' })).toBeTruthy();
    });

    it.each(['Ctrl+B', <kbd key="shortcut">Ctrl+B</kbd>])(
      'preserves an authored render-function label with %p',
      secondaryContent => {
        const onFocus = jest.fn();
        const renderTrigger = jest.fn((triggerProps: TooltipTriggerProps) =>
          React.createElement('button', {
            ...triggerProps,
            'aria-label': 'Toggle bold formatting',
            onFocus: (event: React.FocusEvent<HTMLButtonElement>) => {
              triggerProps.onFocus?.(event);
              onFocus();
            },
          }),
        );
        const renderCount = jest.fn();
        const TestTooltip = () => {
          renderCount();
          return renderTooltip(
            useTooltip({ content: 'Bold', secondaryContent, relationship: 'label', children: renderTrigger }),
          );
        };
        render(<TestTooltip />);
        const trigger = screen.getByRole('button', { name: 'Toggle bold formatting' });
        expect(trigger).not.toHaveAttribute('aria-labelledby');
        expect(renderTrigger).toHaveBeenCalledTimes(renderCount.mock.calls.length);
        expect(screen.queryByRole('tooltip')).toBeNull();
        expect(renderTrigger.mock.calls[0][0].ref).toBeTruthy();
        fireEvent.focus(trigger);
        expect(onFocus).toHaveBeenCalledTimes(1);
      },
    );

    it('labels an unnamed render-function trigger using both content regions', () => {
      render(
        <Tooltip content="Bold" secondaryContent={<kbd>Ctrl+B</kbd>} relationship="label">
          {triggerProps => React.createElement('button', triggerProps)}
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Bold Ctrl+B' })).toHaveAttribute(
        'aria-labelledby',
        screen.getByRole('tooltip').id,
      );
    });

    it('keeps content referenced by an authored render-function description', () => {
      render(
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
        screen.getByRole('button', { name: 'Toggle bold formatting', description: 'Bold Ctrl+B' }),
      ).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);
    });

    it.each([false, true])('preserves authored render-function references (composed=%p)', composed => {
      render(
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
        screen.getByRole('button', { name: composed ? 'Authored name Bold Ctrl+B' : 'Authored name' }),
      ).toHaveAttribute(
        'aria-labelledby',
        composed ? `authored-name ${screen.getByRole('tooltip').id}` : 'authored-name',
      );
    });

    it('supports a render function returning null', () => {
      render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
          {() => null}
        </Tooltip>,
      );
      expect(screen.queryByRole('button')).toBeNull();
    });

    it.each(['description', 'inaccessible'] as const)('preserves render-function %s relationships', relationship => {
      render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship={relationship}>
          {triggerProps => React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' })}
        </Tooltip>,
      );
      const trigger = screen.getByRole('button', {
        name: 'Toggle bold formatting',
        description: relationship === 'description' ? 'Bold Ctrl+B' : '',
      });
      expect(trigger).not.toHaveAttribute('aria-labelledby');
    });

    it('preserves authored render-function labels without secondary content', () => {
      render(
        <Tooltip content="Bold" relationship="label">
          {triggerProps => React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' })}
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Toggle bold formatting' })).not.toHaveAttribute('aria-labelledby');
      expect(screen.queryByRole('tooltip')).toBeNull();
    });

    it('supports secondary slot props while preserving native-layer and arrow attributes', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        <Tooltip
          visible
          withArrow
          content="Bold"
          secondaryContent={{ children: 'Ctrl+B', ref, className: 'custom-secondary' }}
          relationship="label"
        >
          <button />
        </Tooltip>,
      );
      const tooltip = screen.getByRole('tooltip');
      expect(ref.current).toHaveClass('custom-secondary');
      expect(tooltip).toHaveAttribute('popover', 'hint');
      expect(tooltip).toHaveAttribute('data-open');
      expect(tooltip.querySelector('[data-arrow]')).not.toBeNull();
      expect(tooltip.lastElementChild).toContainElement(ref.current);
    });

    it.each([undefined, null])('preserves the original content DOM with secondaryContent=%p', secondaryContent => {
      render(
        <Tooltip visible content="Bold" secondaryContent={secondaryContent} relationship="label">
          <button />
        </Tooltip>,
      );
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip.childNodes).toHaveLength(1);
      expect(tooltip.firstChild?.nodeType).toBe(Node.TEXT_NODE);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Bold');
    });

    it('supports empty secondary text without changing the accessible name', () => {
      render(
        <Tooltip content="Bold" secondaryContent="" relationship="label">
          <button />
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy();
    });

    it('does not create naming attributes for an inaccessible tooltip', () => {
      render(
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="inaccessible">
          <button>Authored name</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Authored name' })).toBeTruthy();
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-labelledby');
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('tooltip')).toBeNull();
    });

    it.each(['label', 'description'] as const)(
      'keeps %s references valid while an expanded popup suppresses the native layer',
      relationship => {
        render(
          <Tooltip visible content="Bold" secondaryContent="Ctrl+B" relationship={relationship}>
            <button aria-haspopup="menu" aria-expanded />
          </Tooltip>,
        );
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).not.toHaveAttribute('data-open');
        expect(screen.getByRole('button')).toHaveAttribute(
          relationship === 'label' ? 'aria-labelledby' : 'aria-describedby',
          tooltip.id,
        );
      },
    );

    it.each(['label', 'description'] as const)('preserves no-slot expanded-popup DOM for %s', relationship => {
      render(
        <Tooltip visible content={<strong>Bold</strong>} relationship={relationship}>
          <button aria-haspopup="menu" aria-expanded />
        </Tooltip>,
      );
      expect(screen.queryByRole('tooltip')).toBeNull();
    });

    it('hydrates a server label before using the rendered secondary content', () => {
      const container = document.createElement('div');
      container.innerHTML = '<button aria-label="Bold Ctrl+B">Trigger</button>';
      document.body.appendChild(container);
      const onError = jest.spyOn(console, 'error');
      render(
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
      expect(screen.getByRole('button', { name: 'Bold Ctrl+B' })).toBeTruthy();
      expect(screen.getByRole('button')).toHaveAttribute('aria-labelledby', 'hydrated-tooltip');
      expect(onError).not.toHaveBeenCalled();
      onError.mockRestore();
    });
  });

  it('renders trigger and tooltip content with correct positioning attributes', async () => {
    render(
      <Tooltip
        content="Default Tooltip"
        relationship="label"
        visible
        positioning={{ position: 'above', align: 'center' }}
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByLabelText('Default Tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveAttribute('popover', 'hint');
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-open');
  });

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    render(
      <Tooltip content={tooltipText} relationship="label">
        <button data-testid="the-target">Trigger</button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', tooltipText);
  });

  it('renders the content of a nontrivial label tooltip', () => {
    render(
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
        <button>Trigger</button>
      </Tooltip>,
    );

    const tooltip = screen.getByRole('tooltip');
    const target = screen.getByRole('button');
    expect(tooltip.id).toBe('the-tooltip-id');
    expect(target).toHaveAttribute('aria-labelledby', 'the-tooltip-id');
  });

  it('renders a description tooltip content always', () => {
    render(
      <Tooltip content="Description tooltip" relationship="description">
        <button>Trigger</button>
      </Tooltip>,
    );

    const tooltip = screen.getByRole('tooltip');
    const target = screen.getByRole('button');
    expect(target).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('renders arrow element when withArrow is true', () => {
    render(
      <Tooltip content="Arrow tooltip" relationship="label" visible withArrow>
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip').querySelector('[data-arrow]')).not.toBeNull();
  });

  // Regression test for https://github.com/microsoft/fluentui/issues/36650 — renderTooltip dropped
  // state.arrowClassName, so a styled layer setting it between useTooltip and renderTooltip never
  // reached the arrow element.
  it('applies state.arrowClassName to the arrow element', () => {
    const StyledTooltip = (props: TooltipProps) => {
      const state = useTooltip(props);
      state.arrowClassName = 'custom-arrow-class';
      return renderTooltip(state);
    };

    render(
      <StyledTooltip content="Styled arrow tooltip" relationship="label" visible withArrow>
        <button>Trigger</button>
      </StyledTooltip>,
    );

    const arrow = screen.getByRole('tooltip').querySelector('[data-arrow]');
    expect(arrow).toHaveClass('custom-arrow-class');
  });

  it('does not render arrow element when withArrow is false', () => {
    render(
      <Tooltip content="No arrow tooltip" relationship="label" visible>
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip').querySelector('[data-arrow]')).toBeNull();
  });

  it("doesn't set any aria attributes for relationship='inaccessible'", () => {
    render(
      <Tooltip content="Inaccessible tooltip" relationship="inaccessible">
        <button>Trigger</button>
      </Tooltip>,
    );

    const target = screen.getByRole('button');
    expect(target).not.toHaveAttribute('aria-label');
    expect(target).not.toHaveAttribute('aria-labelledby');
    expect(target).not.toHaveAttribute('aria-description');
    expect(target).not.toHaveAttribute('aria-describedby');
  });

  it("doesn't override trigger's aria-label", () => {
    render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-label="test-label" />
      </Tooltip>,
    );

    const target = screen.getByRole('button');
    expect(target).toHaveAttribute('aria-label', 'test-label');
    expect(target).not.toHaveAttribute('aria-labelledby');
  });

  it("doesn't override trigger's aria-labelledby", () => {
    render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-labelledby="test-labelledby">Trigger</button>
      </Tooltip>,
    );

    const target = screen.getByRole('button');
    expect(target).toHaveAttribute('aria-labelledby', 'test-labelledby');
  });

  it("doesn't override trigger's aria-describedby", () => {
    render(
      <Tooltip content="Description tooltip" relationship="description">
        <button aria-describedby="test-describedby">Trigger</button>
      </Tooltip>,
    );

    const target = screen.getByRole('button');
    expect(target).not.toHaveAttribute('aria-description');
    expect(target).toHaveAttribute('aria-describedby', 'test-describedby');
  });
});
