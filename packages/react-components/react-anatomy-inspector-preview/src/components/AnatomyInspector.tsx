import * as React from 'react';
import { tokens } from '@fluentui/react-theme';

import { AnatomyInspectorProps, TrackedComponent } from './ShowAnatomy.types';
import { parseFluentClassName } from './utils';
import { AnatomyTitle } from './AnatomyTitle';
import { AnatomyAnnotation } from './AnatomyAnnotation';

export const AnatomyInspector: React.FunctionComponent<AnatomyInspectorProps> = ({ children, displayName }) => {
  const rafRef = React.useRef<number>(0);
  const childrenContainerRef = React.useRef<HTMLDivElement>(null);
  const [trackedComponents, setTrackedComponents] = React.useState<TrackedComponent[]>([]);
  const [selectedComponentName, setSelectedComponentName] = React.useState<string>('');

  React.useEffect(() => {
    const updateTrackedComponents = () => {
      if (!childrenContainerRef.current) {
        return;
      }

      const uniqueFluentClassNames: string[] = [];

      const classString = `fui-${displayName}`;
      const fluentUIElements: Element[] = [];
      childrenContainerRef.current.querySelectorAll(`[class*="${classString}"]`).forEach(element => {
        fluentUIElements.push(element);
      });

      // traverse up looking for fui-FluentProvider### and get the class name
      let fluentProviderClass = '';
      childrenContainerRef.current.closest('.fui-FluentProvider')?.classList.forEach(className => {
        // find the classname that starts with fui-FluentProvider and ends in numbers, indicating it is a portal
        if (className.startsWith('fui-FluentProvider') && className.match(/\d+$/)) {
          fluentProviderClass = className;
        }
      });

      const portals: Element[] = [];

      // HACK: targets in a portal, such as a menu or combobox
      document.body.querySelectorAll(`:scope > .${fluentProviderClass}`).forEach(portal => {
        portals.push(portal);

        portal.querySelectorAll(`[class*="${classString}"]`).forEach(element => {
          fluentUIElements.push(element);
        });
      });

      fluentUIElements.forEach(element => {
        // const classNames = element.className.split(' ').filter(cn => cn.includes(`fui-`));
        const classNames = element.className
          .toString() // NOTE: SVG elements have a className of type SVGAnimatedString which doesn't have a split method
          .split(' ')
          .filter(cn => cn.includes(classString));

        classNames.forEach((className: string) => {
          if (!uniqueFluentClassNames.includes(className)) {
            uniqueFluentClassNames.push(className);
          }
        });
      });

      const updatedTrackedComponents: TrackedComponent[] = [];

      uniqueFluentClassNames.forEach((className: string, i) => {
        const cssSelector = `.${className}`;

        const containers: Element[] = [];

        // elements in the example's child container and all elements in the portals for the story's provider
        // they are limited to elements which match the story's displayName
        const targets: Element[] = [];

        if (childrenContainerRef?.current) {
          containers.push(childrenContainerRef.current);
        }

        if (portals.length > 0) {
          portals.forEach(portal => {
            containers.push(portal);
          });
        }

        // add elements in the example's child container and any portals for the story's provider
        containers.forEach(container => {
          container.querySelectorAll(cssSelector).forEach(element => {
            targets.push(element);
          });
        });

        targets.forEach((target: Element, j: number) => {
          const { componentName, slotName, slotComponentName } = parseFluentClassName(cssSelector);
          const trackedComponent: TrackedComponent = {
            componentName,
            cssSelector,
            labelLeft: 0,
            labelTop: 0,
            order: i * 100 + j,
            position: { x: 0, y: 0, width: 0, height: 0 },
            slotName,
            slotComponentName,
          };

          if (target) {
            const targetRect = target.getBoundingClientRect();
            trackedComponent.position.x = targetRect.x;
            trackedComponent.position.y = targetRect.y;
            trackedComponent.position.width = targetRect.width;
            trackedComponent.position.height = targetRect.height;

            trackedComponent.labelLeft = trackedComponent.position.x;
            trackedComponent.labelTop = trackedComponent.position.y;
          }

          updatedTrackedComponents.push(trackedComponent);
        });
      });

      const sortedTrackedComponents = updatedTrackedComponents
        // Prevent overlapping labels on the horizontal axis
        .sort((a, b) => a.labelTop - b.labelTop)
        .map((trackedComponent: TrackedComponent, i: number, arr) => {
          const tolerance = 16;
          const previousTrackedComponent = arr[i - 1];

          if (
            previousTrackedComponent &&
            trackedComponent.labelTop - previousTrackedComponent.labelTop < tolerance &&
            Math.abs(trackedComponent.labelLeft - previousTrackedComponent.labelLeft) < tolerance
          ) {
            trackedComponent.labelTop = Math.min(
              trackedComponent.labelTop + trackedComponent.position.height,
              previousTrackedComponent.labelTop + tolerance,
            );
          }
          return trackedComponent;
        })

        // Prevent overlapping labels on the vertical axis
        .sort((a, b) => a.labelLeft - b.labelLeft)
        .map((trackedComponent: TrackedComponent, i: number, arr) => {
          const tolerance = 14;
          const previousTrackedComponent = arr[i - 1];

          if (
            previousTrackedComponent &&
            trackedComponent.labelLeft - previousTrackedComponent.labelLeft < tolerance &&
            Math.abs(trackedComponent.labelTop - previousTrackedComponent.labelTop) < tolerance
          ) {
            trackedComponent.labelLeft = Math.min(
              trackedComponent.labelLeft + trackedComponent.position.width,
              previousTrackedComponent.labelLeft + tolerance,
            );
          }
          return trackedComponent;
        })

        // sort components by DOM query order, then insert slots under their corresponding component
        .sort((a, b) => {
          // DOM query order
          return a.order - b.order;
        });

      // Only update state if the tracked components have changed
      if (JSON.stringify(sortedTrackedComponents) !== JSON.stringify(trackedComponents)) {
        setTrackedComponents(sortedTrackedComponents);
      }

      rafRef.current = window.requestAnimationFrame(updateTrackedComponents);
    };

    updateTrackedComponents();

    return () => {
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [displayName, trackedComponents]);

  const trackedComponentMap = new Map<
    string,
    {
      components: TrackedComponent[];
      slots: Map<string, TrackedComponent[]>;
    }
  >();

  trackedComponents.forEach((trackedComponent: TrackedComponent) => {
    const { componentName, slotName, slotComponentName } = trackedComponent;
    const computedComponentName = componentName || slotComponentName;
    if (!trackedComponentMap.has(computedComponentName)) {
      trackedComponentMap.set(computedComponentName, { components: [], slots: new Map<string, TrackedComponent[]>() });
    }

    if (!slotName) {
      trackedComponentMap.get(computedComponentName)!.components.push(trackedComponent);
    } else {
      if (!trackedComponentMap.get(computedComponentName)!.slots.has(slotName)) {
        trackedComponentMap.get(computedComponentName)!.slots.set(slotName, []);
      }
      trackedComponentMap.get(computedComponentName)!.slots.get(slotName)!.push(trackedComponent);
    }
  });

  const anatomyElements: React.ReactElement[] = [];
  let lastComponentIndex = 0;
  let lastSlotIndex = 0;

  // TODO: This loop and the inner loop need to set React keys on AnatomyTitle and AnatomyAnnotation.
  trackedComponentMap.forEach((component, componentName) => {
    const componentLabel = ++lastComponentIndex;
    const isComponentSelected = selectedComponentName === componentName;
    const isComponentInDOM = component.components.length > 0;
    // console.log(componentLabel, componentName, isComponentSelected ? '(selected)' : '(not selected)');

    anatomyElements.push(
      <AnatomyTitle
        isComponentInDOM={isComponentInDOM}
        componentName={componentName}
        label={isComponentInDOM ? componentLabel : '?'}
        labelSize={16}
        setSelectedComponentName={setSelectedComponentName}
        isSelected={isComponentSelected}
      />,
    );
    for (let i = 0; i < component.components.length; i++) {
      anatomyElements.push(
        <AnatomyAnnotation
          label={i === 0 ? componentLabel : ''}
          componentName={componentName}
          isSelected={isComponentSelected}
          isMuted={!!(selectedComponentName && !isComponentSelected)}
          labelTop={component.components[i].labelTop}
          labelLeft={component.components[i].labelLeft}
          position={component.components[i].position}
          data-anatomy-component={componentName}
        />,
      );
    }

    component.slots.forEach((slot, slotName) => {
      const currentSlotLabel = String.fromCharCode(lastSlotIndex++ + 97);
      const isSlotSelected = selectedComponentName === slotName;
      // console.log('  ', currentSlotLabel, slotName, isSlotSelected ? '(selected)' : '(not selected)');
      anatomyElements.push(
        <AnatomyTitle
          slotName={slotName}
          label={currentSlotLabel}
          labelSize={16}
          setSelectedComponentName={setSelectedComponentName}
          isSelected={isSlotSelected}
        />,
      );

      for (let i = 0; i < slot.length; i++) {
        // TODO: Sometimes multiple components have the same slot name.
        //       Currently, when hovering one slot from component A, it is highlighted in component B.
        //       Include the component name in the slot selector so that this doesn't happen.
        //       See Tree/Layouts for reference, expandIcon slot.
        anatomyElements.push(
          <AnatomyAnnotation
            label={i === 0 ? currentSlotLabel : ''}
            isSelected={isSlotSelected}
            isMuted={!!(selectedComponentName && !isSlotSelected)}
            slotName={slotName}
            labelTop={slot[i].labelTop}
            labelLeft={slot[i].labelLeft}
            position={slot[i].position}
            data-anatomy-component={componentName}
            data-anatomy-slot={slotName}
          />,
        );
      }
    });
  });

  if (anatomyElements.length === 0) {
    anatomyElements.push(
      <div style={{ fontStyle: 'italic' }}>
        No Fluent UI
        <br />
        elements rendered
      </div>,
    );
  }

  return (
    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXXXL }}>
      <pre
        style={{
          flex: 1,
          padding: 0,
          margin: 0,
          fontFamily: 'var(--fontFamilyMonospace)',
          borderRight: `1px solid rgba(0, 0, 0, 0.1)`,
        }}
      >
        {anatomyElements}
      </pre>

      <div style={{ flex: 3, minWidth: 0 }} ref={childrenContainerRef}>
        {children}
      </div>
    </div>
  );
};
