import { ax, makeStylesCompat } from '@fluentui/react-make-styles';
import { getNativeProps, htmlElementProperties } from '@fluentui/react-utilities';
import * as React from 'react';

const useRootStyles = makeStylesCompat([
  [
    null,
    {
      display: 'inline-block',
      verticalAlign: 'middle',
      speak: 'none',
      width: '1em',
      height: '1em',
    },
  ],
]);

const useSvgStyles = makeStylesCompat([
  [
    null,
    {
      height: '100%',
      fill: 'currentColor',
      verticalAlign: 'top',
    },
  ],
]);

//
// !!!   A temporary workaround to avoid dependencies on any icon packages.
// !!!   A usage of converged icon package should be considered.
//

const useIconProps = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const containerProps = props['aria-label']
    ? {}
    : {
        role: 'presentation',
        ['aria-hidden']: true,
      };
  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(props, htmlElementProperties);

  const rootClasses = useRootStyles({});
  const svgClasses = useSvgStyles({});

  return { containerProps, nativeProps, rootClasses, svgClasses };
};

export const renderIcon = (
  SVGElement: (props: { svgClasses: string }) => JSX.Element,
): React.FC<React.HTMLAttributes<HTMLSpanElement>> => props => {
  const { containerProps, nativeProps, rootClasses, svgClasses } = useIconProps(props);

  return React.createElement(
    React.Fragment,
    {
      ...containerProps,
      ...nativeProps,
      className: ax(rootClasses, props.className),
    },
    <SVGElement svgClasses={ax(rootClasses, props.className, svgClasses)} />,
  );
};

const SkypeMinusIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1591 823q42 0 78 16t64 43 43 63 16 79q0 42-16 78t-43 64-63 43-79 16H395q-42 0-78-16t-64-43-42-63-16-79q0-42 15-78t43-64 63-43 79-16h1196z" />
  </svg>
));

SkypeMinusIcon.displayName = 'SkypeMinusIcon';

const SkypeClockIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1431 1705q28 28 43 65t15 77q0 42-15 78t-43 64-63 43-79 16q-83 0-142-59l-594-593q-28-28-43-65t-15-77V201q0-42 15-78t43-64 63-43 79-16q42 0 78 16t64 43 43 63 16 79v970l535 534z" />
  </svg>
));

SkypeClockIcon.displayName = 'SkypeClockIcon';

const SkypeCheckIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1570 437q42 0 78 15t64 43 42 63 16 79q0 40-15 77t-43 65l-794 795q-28 28-65 43t-77 16q-40 0-77-15t-65-44l-362-362q-28-28-43-65t-16-77q0-42 16-78t43-64 63-42 79-16q40 0 77 15t65 43l220 220 652-653q28-28 65-43t77-15z" />
  </svg>
));

SkypeCheckIcon.displayName = 'SkypeCheckIcon';

const SkypeArrowIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1980 964q0 41-15 77t-43 63-63 42-77 16H739l281 280q28 27 43 64t15 76q0 41-15 77t-43 63-63 42-77 16q-39 0-75-15t-65-43l-615-616q-33-33-47-68t-14-82q0-39 17-73t44-61l615-616q28-28 65-43t76-15q41 0 77 16t62 43 42 63 16 77q0 39-15 75t-43 64L739 766h1043q41 0 77 15t63 43 42 63 16 77z" />
  </svg>
));

SkypeArrowIcon.displayName = 'SkypeArrowIcon';

const CancelIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1115 1024l690 691-90 90-691-690-691 690-90-90 690-691-690-691 90-90 691 690 691-690 90 90-690 691z" />
  </svg>
));

CancelIcon.displayName = 'CancelIcon';

export { SkypeMinusIcon, SkypeClockIcon, SkypeCheckIcon, SkypeArrowIcon, CancelIcon };
