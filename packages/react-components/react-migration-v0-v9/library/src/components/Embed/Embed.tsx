import * as React from 'react';
import { Image, type ImageProps } from "@fluentui/react-image";
import { mergeClasses } from '@griffel/react';
import { ForwardRefComponent, getIntrinsicElementProps, useControllableState } from '@fluentui/react-utilities';
import type { EmbedProps } from './Embed.types';
import { EmbedControl } from './EmbedControl';
import { Video, type VideoProps } from '../Video/Video';
import { useStyles } from './Embed.styles';

export const embedClassName = 'fui-Embed';

export const Embed: ForwardRefComponent<EmbedProps> = React.forwardRef((props, ref) => {
  const {
    active: activeProp,
    className,
    control,
    defaultActive,
    onActiveChange,
    onKeyDown,
    placeholder,
    video,
    ...rest
  } = props;

  const styles = useStyles();

  const [active, setActive] = useControllableState({
    state: activeProp,
    defaultState: defaultActive,
    initialState: false,
  });

  const handleClick = (e: React.MouseEvent) => {
    const newActive = !active;
    setActive(newActive);
    onActiveChange?.(e, { active: newActive });
    e.stopPropagation();
    e.preventDefault();
  };

  const handleKeyDown = React.useCallback(
    e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const newActive = !active;
        setActive(newActive);
        onActiveChange?.(e, { active: newActive });
        e.stopPropagation();
        e.preventDefault();
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );

  const root = getIntrinsicElementProps('span', {
    ref,
    'aria-hidden': rest.alt || rest.title ? undefined : true,
    role: 'presentation',
    tabIndex: 0,
    ...rest,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    className: mergeClasses(embedClassName, styles.root, className),
  });

  const videoProps = video ? {
    autoPlay: true,
    controls: false,
    loop: true,
    muted: true,
    poster: placeholder,
    ...(typeof video === 'string' ? { src: video } : video),
  } as VideoProps : undefined;

  const placeholderProps = placeholder ? {
    ...(typeof placeholder === 'string' ? { src: placeholder } : placeholder),
  } as ImageProps : undefined;

  return (
    <span
    {...root}
    >
      {active && video && <Video {...videoProps} />}
      {!active && placeholder && <Image {...placeholderProps} />}
      <EmbedControl
        onClick={handleClick}
        active={active}
        {...control}
      />
    </span>
  );
});

Embed.displayName = 'Embed';
