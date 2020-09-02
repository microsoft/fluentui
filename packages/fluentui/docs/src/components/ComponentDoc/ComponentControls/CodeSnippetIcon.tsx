import * as React from 'react';
import { createSvgIcon, iconClassNames } from '@fluentui/react-icons-northstar';
import cx from 'classnames';

const CodeSnippetIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <g className={cx(iconClassNames.outline, classes.outlinePart)}>
          <path d="M20 20a.5.5 0 0 1-.38-.825L22.342 16l-2.722-3.175a.5.5 0 1 1 .76-.651l3 3.5a.5.5 0 0 1 0 .65l-3 3.5A.5.5 0 0 1 20 20zM14.251 23.5a.5.5 0 0 1-.482-.638l4-14a.499.499 0 1 1 .961.274l-4 14a.498.498 0 0 1-.479.364zM12 20a.5.5 0 0 0 .38-.825L9.658 16l2.722-3.175a.5.5 0 1 0-.76-.651l-3 3.5a.5.5 0 0 0 0 .65l3 3.5A.5.5 0 0 0 12 20z" />
        </g>
        <g className={cx(iconClassNames.filled, classes.filledPart)}>
          <path d="M20 20.5a.993.993 0 0 1-.65-.241.997.997 0 0 1-.108-1.409L21.683 16l-2.441-2.849a.999.999 0 1 1 1.517-1.302l3 3.5a1 1 0 0 1 0 1.301l-3 3.5a.993.993 0 0 1-.759.35zM12 20.5a.995.995 0 0 1-.76-.35l-3-3.5a1 1 0 0 1 0-1.301l3-3.5a1 1 0 0 1 1.518 1.302L10.317 16l2.442 2.85A1 1 0 0 1 12 20.5zM14.251 23.5a.5.5 0 0 1-.482-.638l4-14a.499.499 0 1 1 .961.274l-4 14a.498.498 0 0 1-.479.364z" />
        </g>
      </g>
    </svg>
  ),
  displayName: 'CodeSnippetIcon',
});

export default CodeSnippetIcon;
