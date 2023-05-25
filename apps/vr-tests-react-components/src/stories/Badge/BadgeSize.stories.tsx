import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { propValues, useStyles } from './utils';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, RTL } from '../../utilities';

const BadgeSampleRow: React.FC<BadgeProps> = props => {
  const styles = useStyles();

  // Text content is not supported for tiny and extra-small
  if (props.size === 'tiny' || props.size === 'extra-small') {
    return (
      <div className={styles.row}>
        <Badge {...props} icon={props.size === 'tiny' ? null : <CircleRegular />} />
      </div>
    );
  }

  return (
    <div className={styles.row}>
      <Badge {...props}>1</Badge>
      <Badge {...props} icon={<CircleRegular />} />
      <Badge {...props}>BADGE</Badge>
      <Badge {...props} icon={<CircleRegular />}>
        BADGE
      </Badge>
      <Badge {...props} icon={<CircleRegular />} iconPosition="after">
        BADGE
      </Badge>
      {props.children}
    </div>
  );
};

export default {
  title: 'Badge Converged',
} as ComponentMeta<typeof Badge>;

export const SizeTiny = () => {
  const styles = useStyles();
  return (
    <div className={styles.groupSet}>
      {propValues.appearance.map(appearance =>
        // tiny + ghost is not supported
        appearance === 'ghost' ? null : (
          <div key={appearance} className={styles.group}>
            <span className={styles.groupLabel}>appearance: {appearance}</span>
            {propValues.shape.map(shape => (
              <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={'tiny'} />
            ))}
          </div>
        ),
      )}
    </div>
  );
};

SizeTiny.storyName = 'size: tiny';

export const SizeTinyRTL = getStoryVariant(SizeTiny, RTL);

export const SizeExtraSmall = () => {
  const styles = useStyles();
  return (
    <div className={styles.groupSet}>
      {propValues.appearance.map(appearance => (
        <div key={appearance} className={styles.group}>
          <span className={styles.groupLabel}>appearance: {appearance}</span>
          {propValues.shape.map(shape => (
            <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={'extra-small'} />
          ))}
        </div>
      ))}
    </div>
  );
};

SizeExtraSmall.storyName = 'size: extra-small';

export const SizeExtraSmallRTL = getStoryVariant(SizeExtraSmall, RTL);

export const SizeSmall = () => {
  const styles = useStyles();
  return (
    <div className={styles.groupSet}>
      {propValues.appearance.map(appearance => (
        <div key={appearance} className={styles.group}>
          <span className={styles.groupLabel}>appearance: {appearance}</span>
          {propValues.shape.map(shape => (
            <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={'small'} />
          ))}
        </div>
      ))}
    </div>
  );
};

SizeSmall.storyName = 'size: small';

export const SizeSmallRTL = getStoryVariant(SizeSmall, RTL);

export const SizeMedium = () => {
  const styles = useStyles();
  return (
    <div className={styles.groupSet}>
      {propValues.appearance.map(appearance => (
        <div key={appearance} className={styles.group}>
          <span className={styles.groupLabel}>appearance: {appearance}</span>
          {propValues.shape.map(shape => (
            <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={'medium'} />
          ))}
        </div>
      ))}
    </div>
  );
};

SizeMedium.storyName = 'size: medium';

export const SizeMediumRTL = getStoryVariant(SizeMedium, RTL);

export const SizeLarge = () => {
  const styles = useStyles();
  return (
    <div className={styles.groupSet}>
      {propValues.appearance.map(appearance => (
        <div key={appearance} className={styles.group}>
          <span className={styles.groupLabel}>appearance: {appearance}</span>
          {propValues.shape.map(shape => (
            <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={'large'} />
          ))}
        </div>
      ))}
    </div>
  );
};

SizeLarge.storyName = 'size: large';

export const SizeLargeRTL = getStoryVariant(SizeLarge, RTL);

export const SizeExtraLarge = () => {
  const styles = useStyles();
  return (
    <div className={styles.groupSet}>
      {propValues.appearance.map(appearance => (
        <div key={appearance} className={styles.group}>
          <span className={styles.groupLabel}>appearance: {appearance}</span>
          {propValues.shape.map(shape => (
            <BadgeSampleRow key={shape} shape={shape} appearance={appearance} size={'extra-large'} />
          ))}
        </div>
      ))}
    </div>
  );
};

SizeExtraLarge.storyName = 'size: extra-large';

export const SizeExtraLargeRTL = getStoryVariant(SizeExtraLarge, RTL);

export const WidthConstrained = () => {
  const styles = useStyles();
  return (
    <div className={styles.group}>
      <div className={styles.widthConstrained}>
        <Badge>1</Badge>
        <Badge icon={<CircleRegular />} />
        <Badge>BADGE</Badge>
        <Badge icon={<CircleRegular />}>BADGE</Badge>
        <Badge icon={<CircleRegular />} iconPosition="after">
          BADGE
        </Badge>
      </div>
      <span className={styles.description}>Badges should not clip their content when space constrained.</span>
    </div>
  );
};

WidthConstrained.storyName = 'width constrained';
