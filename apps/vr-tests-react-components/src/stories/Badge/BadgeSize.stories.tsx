import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { propValues, useStyles } from './utils';

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

// size stories
propValues.size.forEach(size =>
  storiesOf('Badge Converged', module)
    .add(
      'size: tiny',
      () => {
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
      },
      { includeRtl: true },
    )
    .add(
      'size: extra-small',
      () => {
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
      },
      { includeRtl: true },
    )
    .add(
      'size: small',
      () => {
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
      },
      { includeRtl: true },
    )
    .add(
      'size: medium',
      () => {
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
      },
      { includeRtl: true },
    )
    .add(
      'size: large',
      () => {
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
      },
      { includeRtl: true },
    )
    .add(
      'size: extra-large',
      () => {
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
      },
      { includeRtl: true },
    ),
);
