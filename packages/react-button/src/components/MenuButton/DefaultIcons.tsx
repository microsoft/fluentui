import * as React from 'react';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { getNativeProps, htmlElementProperties } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    speak: 'none',
    width: '1em',
    height: '1em',
  },
  svg: {
    height: '100%',
    fill: 'currentColor',
    verticalAlign: 'top',
  },
});

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
  const styles = useStyles();

  const rootClasses = styles.root;
  const svgClasses = styles.svg;

  return { containerProps, nativeProps, rootClasses, svgClasses };
};

export const renderIcon = (
  SVGElement: (props: { svgClasses: string }) => JSX.Element,
): React.FC<React.HTMLAttributes<HTMLSpanElement>> => props => {
  const { containerProps, nativeProps, rootClasses, svgClasses } = useIconProps(props);

  return React.createElement(
    'span',
    {
      ...containerProps,
      ...nativeProps,
      className: mergeClasses(rootClasses, props.className),
    },
    <SVGElement svgClasses={svgClasses} />,
  );
};

export const ChevronDownIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1939 467l90 90-1005 1005L19 557l90-90 915 915 915-915z" />
  </svg>
));
