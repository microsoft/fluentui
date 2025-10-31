import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, tokens } from '@fluentui/react-components';
import { MenuGrid, MenuGridGroup, MenuGridGroupHeader, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = {
  people: ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'],
  agentsAndBots: ['Facilitator', 'Copilot'],
  fruits: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
  weathers: ['Sunny', 'Rainy', 'Cloudy', 'Windy', 'Snowy'],

  vegetables: ['Carrot', 'Broccoli', 'Spinach', 'Potato', 'Cucumber', 'Tomato', 'Onion', 'Pepper'],
};

type HeaderVisState = {
  fullyVisible: boolean;
  where: 'above' | 'below' | null;
  collapsedTop: boolean;
  collapsedBottom: boolean;
};

type MenuGridWithHeaderButtonsProps = {
  children: React.ReactNode;
  maxHeight?: number;
};

const MenuGridWithHeaderButtons: React.FC<MenuGridWithHeaderButtonsProps> = ({ children, maxHeight = 300 }) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const headerRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const [vis, setVis] = React.useState<Record<string, HeaderVisState>>({});

  // render MenuGrid and collect header refs
  const gridContent = React.useMemo(() => {
    const groups = React.Children.toArray(children);

    return (
      <MenuGrid>
        {groups.map((groupNode, groupIndex) => {
          if (!React.isValidElement(groupNode) || (groupNode.type as any) !== MenuGridGroup) {
            return groupNode;
          }

          const groupChildren = React.Children.toArray(groupNode.props.children);
          let headerKey = `group-${groupIndex}`;
          let headerFound = false;

          return (
            <MenuGridGroup key={groupIndex}>
              {groupChildren.map((child, childIndex) => {
                if (!headerFound && React.isValidElement(child) && (child.type as any) === MenuGridGroupHeader) {
                  headerFound = true;
                  const text = typeof child.props.children === 'string' ? child.props.children : `group-${groupIndex}`;
                  headerKey = text;

                  const headerState = vis[headerKey];
                  const isCollapsed = !!(headerState?.collapsedTop || headerState?.collapsedBottom);

                  return (
                    <div
                      key={`header-${headerKey}`}
                      data-header-key={headerKey}
                      ref={el => {
                        headerRefs.current[headerKey] = el;
                      }}
                      style={{
                        overflow: 'hidden',
                        height: isCollapsed ? 1 : undefined,
                        transition: 'height 80ms ease-out',
                      }}
                    >
                      {child}
                    </div>
                  );
                }

                return <React.Fragment key={childIndex}>{child}</React.Fragment>;
              })}
            </MenuGridGroup>
          );
        })}
      </MenuGrid>
    );
  }, [children, vis]);

  React.useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const applyRules = (el: HTMLElement, prev: Record<string, HeaderVisState>): Record<string, HeaderVisState> => {
      const key = el.getAttribute('data-header-key');
      if (!key) return prev;

      const rect = el.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();

      const prevState = prev[key] ?? {
        fullyVisible: true,
        where: null,
        collapsedTop: false,
        collapsedBottom: false,
      };

      let { collapsedTop, collapsedBottom } = prevState;
      let where: 'above' | 'below' | null = null;

      const fullyVisible = rect.top >= rootRect.top && rect.bottom <= rootRect.bottom;

      const containerScrolled = root.scrollTop > 0;

      // 1. As soon as the 0px header passes the container's top border,
      //    change its height back to normal and hide the button.
      //    "passes" = now strictly below the top
      if (collapsedTop && rect.bottom > rootRect.top + 0.5) {
        collapsedTop = false;
      }
      // 2. As soon as a header's top border touches the container's top border,
      //    show the button and change the header height to 0.
      if (containerScrolled && rect.top <= rootRect.top + 0.5) {
        collapsedTop = true;
      }

      // 3. As soon as the 0px header passes the container's bottom border,
      //    change its height back to normal and hide the button.
      //    when collapsedBottom, the element's TOP will move upward with scroll;
      //    once top is strictly above bottom, we can restore
      if (collapsedBottom && rect.top < rootRect.bottom - 0.5) {
        collapsedBottom = false;
      }
      // 4. As soon as a header's bottom border touches the container's bottom border,
      //    show the button and change the header height to 0.
      if (rect.bottom >= rootRect.bottom - 0.5) {
        collapsedBottom = true;
      }

      // keep above/below for the original behavior (optional now)
      if (!fullyVisible) {
        if (rect.bottom <= rootRect.top) where = 'above';
        else if (rect.top >= rootRect.bottom) where = 'below';
        else if (rect.top < rootRect.top) where = 'above';
        else if (rect.bottom > rootRect.bottom) where = 'below';
      }

      return {
        ...prev,
        [key]: {
          fullyVisible,
          where,
          collapsedTop,
          collapsedBottom,
        },
      };
    };

    const io = new IntersectionObserver(
      entries => {
        setVis(prev => {
          let next = { ...prev };
          for (const entry of entries) {
            next = applyRules(entry.target as HTMLElement, next);
          }
          return next;
        });
      },
      {
        root,
        threshold: [1],
        rootMargin: '1px',
      },
    );

    const allHeaders = Object.entries(headerRefs.current);
    allHeaders.forEach(([, el]) => {
      if (el) {
        io.observe(el);
      }
    });

    // re-check on scroll/resize
    const recheck = () => {
      allHeaders.forEach(([, el]) => {
        if (el) {
          io.unobserve(el);
          io.observe(el);
        }
      });
      // and re-apply rules immediately
      setVis(prev => {
        let next = { ...prev };
        allHeaders.forEach(([, el]) => {
          if (el) {
            next = applyRules(el, next);
          }
        });
        return next;
      });
    };

    root.addEventListener('scroll', recheck, { passive: true });
    window.addEventListener('resize', recheck, { passive: true });

    return () => {
      root.removeEventListener('scroll', recheck);
      window.removeEventListener('resize', recheck);
      io.disconnect();
    };
  }, []);

  // 👇 smarter scroll that subtracts *all headers that will collapse* above the target
  const scrollToHeader = (key: string) => {
    const container = scrollRef.current;
    const target = headerRefs.current[key];
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // where the target would be (in scroll space) if we naïvely scrolled it to the top
    const targetTopInScrollCoords = container.scrollTop + (targetRect.top - containerRect.top);

    // now: any header whose top (in scroll coords) is < targetTopInScrollCoords
    // AND is currently *not* collapsed at top will get collapsed by IO once we do that scroll
    // => we need to subtract its natural height
    let collapseBudget = 0;

    Object.entries(headerRefs.current).forEach(([hKey, el]) => {
      if (!el) return;

      const headerRect = el.getBoundingClientRect();
      const headerTopInScroll = container.scrollTop + (headerRect.top - containerRect.top);

      // only headers above the target
      if (headerTopInScroll < targetTopInScrollCoords) {
        const headerState = vis[hKey];
        const alreadyCollapsed = headerState?.collapsedTop || headerState?.collapsedBottom;
        if (!alreadyCollapsed) {
          // natural height right now
          const h = el.offsetHeight;
          if (h > 0) {
            collapseBudget += h;
          }
        }
      }
    });

    const finalScrollTop = Math.max(0, targetTopInScrollCoords - collapseBudget - 1);

    container.scrollTo({
      top: finalScrollTop,
      behavior: 'smooth',
    });
  };

  const aboveKeys = Object.entries(vis)
    .filter(([, v]) => v.collapsedTop)
    .map(([k]) => k);

  const belowKeys = Object.entries(vis)
    .filter(([, v]) => v.collapsedBottom)
    .map(([k]) => k);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight,
        overflow: 'hidden',
        border: '1px solid var(--colorNeutralStroke1, #ddd)',
        borderRadius: 4,
        background: 'var(--colorNeutralBackground1, #fff)',
      }}
    >
      {/* top helper buttons */}
      {aboveKeys.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {aboveKeys.map(key => (
            <Button
              appearance="transparent"
              key={`above-${key}`}
              onClick={() => scrollToHeader(key)}
              style={{
                fontWeight: tokens.fontWeightRegular,
                padding: 0,
                border: '0px',
                justifyContent: 'flex-start',
                backgroundColor: 'salmon',
              }}
            >
              {key}
            </Button>
          ))}
        </div>
      )}

      {/* scrollable middle */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        {gridContent}
      </div>

      {/* bottom helper buttons */}
      {belowKeys.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {belowKeys.map(key => (
            <Button
              appearance="transparent"
              key={`below-${key}`}
              onClick={() => scrollToHeader(key)}
              style={{
                fontWeight: tokens.fontWeightRegular,
                padding: 0,
                border: '0px',
                justifyContent: 'flex-start',
                backgroundColor: 'salmon',
              }}
            >
              {key}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

// -----------------------------
// Your final example
// -----------------------------
export const GroupingItems = (): JSXElement => {
  return (
    <MenuGridWithHeaderButtons>
      <MenuGridGroup>
        <MenuGridGroupHeader>People</MenuGridGroupHeader>
        {items.people.map(name => (
          <MenuGridItem
            key={name}
            icon={
              <Button
                size="small"
                appearance="transparent"
                icon={<GlobePersonRegular />}
                aria-label={`Profile card for ${name}`}
              />
            }
            firstSubAction={
              <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
            }
            aria-label={name}
          >
            {name}
          </MenuGridItem>
        ))}
      </MenuGridGroup>

      <MenuGridGroup>
        <MenuGridGroupHeader>Agents And Bots</MenuGridGroupHeader>
        {items.agentsAndBots.map(name => (
          <MenuGridItem
            key={name}
            icon={
              <Button
                size="small"
                appearance="transparent"
                icon={<GlobePersonRegular />}
                aria-label={`Profile card for ${name}`}
              />
            }
            firstSubAction={
              <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
            }
            aria-label={name}
          >
            {name}
          </MenuGridItem>
        ))}
      </MenuGridGroup>

      <MenuGridGroup>
        <MenuGridGroupHeader>fruits</MenuGridGroupHeader>
        {items.fruits.map(name => (
          <MenuGridItem key={name} aria-label={name}>
            {name}
          </MenuGridItem>
        ))}
      </MenuGridGroup>

      <MenuGridGroup>
        <MenuGridGroupHeader>weathers</MenuGridGroupHeader>
        {items.weathers.map(name => (
          <MenuGridItem key={name} aria-label={name}>
            {name}
          </MenuGridItem>
        ))}
      </MenuGridGroup>

      <MenuGridGroup>
        <MenuGridGroupHeader>vegetables</MenuGridGroupHeader>
        {items.vegetables.map(name => (
          <MenuGridItem key={name} aria-label={name}>
            {name}
          </MenuGridItem>
        ))}
      </MenuGridGroup>
    </MenuGridWithHeaderButtons>
  );
};
