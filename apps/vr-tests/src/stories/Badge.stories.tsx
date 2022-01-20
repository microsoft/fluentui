import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { CircleRegular } from '@fluentui/react-icons';
import { mergeClasses, makeStyles, shorthands } from '@fluentui/react-make-styles';
import { tokens } from '@fluentui/react-theme';

type BadgeColor = Required<BadgeProps>['color'];
const badgeColors: BadgeColor[] = [
  'brand',
  'danger',
  'important',
  'informative',
  'severe',
  'subtle',
  'success',
  'warning',
];

type BadgeAppearance = Required<BadgeProps>['appearance'];
const badgeAppearances: BadgeAppearance[] = ['filled', 'outline', 'tint', 'ghost'];

type BadgeSize = Required<BadgeProps>['size'];
const badgeSizes: BadgeSize[] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'];

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('5px'),
    ...shorthands.padding('5px'),
  },

  label: {
    marginLeft: '10px',
  },

  brandContainer: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
  },
});

const BadgeRow: React.FC<
  Pick<BadgeProps, 'size' | 'color'> & Required<Pick<BadgeProps, 'appearance'>>
> = props => {
  const styles = useStyles();

  const { size, appearance, color, children } = props;

  const allowLabel = size !== 'tiny' && size !== 'extra-small';

  const circularWithText = (
    <Badge size={size} appearance={appearance} color={color}>
      {allowLabel && '1'}
    </Badge>
  );
  const circularWithIcon = (
    <Badge size={size} appearance={appearance} color={color} icon={<CircleRegular />} />
  );
  const roundedWithIcon = (
    <Badge
      size={size}
      appearance={appearance}
      color={color}
      shape="rounded"
      icon={<CircleRegular />}
    />
  );
  const roundedWithText = (
    <Badge size={size} appearance={appearance} color={color} shape="rounded">
      {allowLabel && appearance.toUpperCase()}
    </Badge>
  );
  const roundedWithTextAndIconBefore = (
    <Badge
      size={size}
      appearance={appearance}
      color={color}
      shape="rounded"
      icon={<CircleRegular />}
      iconPosition="before"
    >
      {allowLabel && appearance.toUpperCase()}
    </Badge>
  );
  const roundedWithTextAndIconAfter = (
    <Badge
      size={size}
      appearance={appearance}
      color={color}
      shape="rounded"
      icon={<CircleRegular />}
      iconPosition="after"
    >
      {allowLabel && appearance.toUpperCase()}
    </Badge>
  );

  return (
    <div className={styles.container}>
      <div
        className={mergeClasses(
          styles.badgeContainer,
          color === 'subtle' && appearance === 'outline' && styles.brandContainer,
          color === 'subtle' && appearance === 'ghost' && styles.brandContainer,
        )}
      >
        {circularWithText}
        {circularWithIcon}
        {roundedWithIcon}
        {roundedWithText}
        {roundedWithTextAndIconAfter}
        {roundedWithTextAndIconBefore}
      </div>
      <div className={styles.label}>{children}</div>
    </div>
  );
};

const BadgeAppearanceTemplate: React.FC<{ appearance: BadgeAppearance }> = ({ appearance }) => (
  <div>
    {badgeColors.map(color => (
      <BadgeRow key={color} color={color} appearance={appearance}>
        {color}
      </BadgeRow>
    ))}
  </div>
);

const BadgeSizeTemplate: React.FC<{ appearance: BadgeAppearance }> = ({ appearance }) => (
  <div>
    {badgeSizes.map(size => (
      <BadgeRow key={size} size={size} appearance={appearance}>
        {size}
      </BadgeRow>
    ))}
  </div>
);

const appearanceStories = storiesOf('Badge Converged', module);

badgeAppearances.forEach(appearance => {
  appearanceStories.addStory(
    appearance,
    () => <BadgeAppearanceTemplate appearance={appearance} />,
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );
});

const sizeStories = storiesOf('Badge Converged - sizes', module);

badgeAppearances.forEach(appearance => {
  sizeStories.addStory(appearance, () => <BadgeSizeTemplate appearance={appearance} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  });
});

// .addStory(
//   'default',
//   () => {
//     // const allowText = (size: string) => size !== 'tiny' && size !== 'extra-small';

//     // const circularWithText = sizes.map(size => (
//     //   <Badge key={`circularWithText-${size}`} size={size}>
//     //     {allowText(size) && '1'}
//     //   </Badge>
//     // ));
//     // const circularWithIcon = sizes.map(size => (
//     //   <Badge key={`circularWithIcon-${size}`} size={size} icon={<CircleRegular />} />
//     // ));
//     // const roundedWithText = sizes.map(size => (
//     //   <Badge key={`roundedWithText-${size}`} shape="rounded" size={size}>
//     //     {allowText(size) && size.toUpperCase()}
//     //   </Badge>
//     // ));
//     // const roundedWithIcon = sizes.map(size => (
//     //   <Badge key={`roundedWithIcon-${size}`} size={size} shape="rounded" icon={<CircleRegular />} />
//     // ));
//     // const iconText = sizes.map(size => (
//     //   <Badge key={`iconText-${size}`} size={size} icon={<CircleRegular />}>
//     //     {allowText(size) && size.toUpperCase()}
//     //   </Badge>
//     // ));
//     // const textOnly = sizes.map(size => (
//     //   <Badge key={`textOnly-${size}`} size={size}>
//     //     {allowText(size) && size.toUpperCase()}
//     //   </Badge>
//     // ));
//     // const basic = sizes.map(size => <Badge key={`basic-${size}`} size={size} />);

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: `repeat(${sizes.length}, auto)`,
//           gridAutoFlow: 'row',
//           gap: '10px',
//           justifyContent: 'start',
//           placeItems: 'center',
//         }}
//       >
//         {...sizes.map(size => {
//           const allowText = size !== 'tiny' && size !== 'extra-small';

//           const circularWithText = <Badge size={size}>{allowText && '1'}</Badge>;
//           const circularWithIcon = <Badge size={size} icon={<CircleRegular />} />;
//           const roundedWithIcon = <Badge size={size} shape="rounded" icon={<CircleRegular />} />;
//           const roundedWithText = (
//             <Badge size={size} shape="rounded">
//               {allowText && size.toUpperCase()}
//             </Badge>
//           );
//           const roundedWithTextAndIconBefore = (
//             <Badge size={size} shape="rounded" icon={<CircleRegular />} iconPosition="before">
//               {allowText && size.toUpperCase()}
//             </Badge>
//           );
//           const roundedWithTextAndIconAfter = (
//             <Badge size={size} shape="rounded" icon={<CircleRegular />} iconPosition="after">
//               {allowText && size.toUpperCase()}
//             </Badge>
//           );

//           return (
//             <>
//               {circularWithText}
//               {circularWithIcon}
//               {roundedWithIcon}
//               {roundedWithText}
//               {roundedWithTextAndIconBefore}
//               {roundedWithTextAndIconAfter}
//             </>
//           );
//         })}

//         {/* {...circularWithText}
//         {...circularWithIcon}
//         {...roundedWithIcon}
//         {...roundedWithText}
//         {...iconText}
//         {...textOnly}
//         {...basic} */}
//         {/* {sizes.map(size => (
//           <>
//             {(size !== 'tiny' && size !== 'extra-small' && (
//               <Badge size={size}>{size.toUpperCase()}</Badge>
//             )) || <span>{size}</span>}
//             {(size !== 'tiny' && size !== 'extra-small' && (
//               <Badge size={size} icon={<CircleRegular />}>
//                 {size.toUpperCase()}
//               </Badge>
//             )) || <span />}
//             {(size !== 'tiny' && <Badge size={size} icon={<CircleRegular />} />) || <span />}
//             <Badge size={size} />
//           </>
//         ))} */}
//       </div>
//     );
//   },
//   { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
// );
