import * as React from 'react';
import { Avatar, AvatarProps } from '@fluentui/react-northstar';

const CustomAvatar = (props: AvatarProps & { image?: string; hexagonal?: boolean }) => {
  const { hexagonal, ...rest } = props;

  if (hexagonal) {
    return (
      <Avatar
        {...rest}
        image={{
          src: rest.image,
          children: (Component, props) => {
            const { src, ...restImageProps } = props;
            return (
              <svg
                viewBox="0 0 34 34"
                role="img"
                id="hexagon-mask"
                aria-labelledby="hexagon-mask"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect fill="transparent" clipPath="url(#bot-hexagon-clip-path)" width="34px" height="34px" />
                <Component
                  as="image"
                  clipPath="url(#bot-hexagon-clip-path)"
                  width="34px"
                  height="34px"
                  xlinkHref={src}
                  {...restImageProps}
                />
              </svg>
            );
          },
        }}
      />
    );
  }
  return <Avatar {...rest} />;
};

export default CustomAvatar;
