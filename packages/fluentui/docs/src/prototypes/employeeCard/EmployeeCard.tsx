import * as React from 'react';
import { Avatar, AvatarProps, Divider, Extendable, Grid, ShorthandValue } from '@fluentui/react-northstar';
import CustomText from './CustomText';

export interface EmployeeCardProps {
  firstName?: string;
  lastName?: string;
  status?: string;
  position?: string;
  team?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: ShorthandValue<AvatarProps>;
}

class EmployeeCard extends React.Component<Extendable<EmployeeCardProps>, any> {
  render() {
    const { firstName, lastName, status, position, team, location, email, avatar, phone, ...restProps } = this.props;
    return (
      <Grid
        columns="80% 20%"
        styles={{ width: '320px', padding: '10px 20px 10px 10px', background: 'white' }}
        {...restProps}
      >
        <div>
          <CustomText size={'medium'} weight={'bold'} as="div">
            {firstName} {lastName}
          </CustomText>
          <CustomText muted as="div">
            {status}
          </CustomText>
          <Divider variables={{ dividerColor: 'white' }} />
          {position && (
            <CustomText muted as="div">
              {position}
            </CustomText>
          )}
          {team && (
            <CustomText muted as="div">
              {team}
            </CustomText>
          )}
          {location && (
            <CustomText muted as="div">
              {location}
            </CustomText>
          )}
          {phone && (
            <CustomText muted as="div">
              {phone}
            </CustomText>
          )}
          {email && (
            <CustomText muted as="div">
              {email}
            </CustomText>
          )}
        </div>
        {Avatar.create(avatar, {
          defaultProps: () => ({
            size: 'largest',
            name: `${firstName} ${lastName}`,
          }),
        })}
      </Grid>
    );
  }
}

export default EmployeeCard;
