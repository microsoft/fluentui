import * as React from 'react';
import { Avatar, Extendable, Popup } from '@fluentui/react-northstar';
import EmployeeCard, { EmployeeCardProps } from './EmployeeCard';

export interface AvatarEmployeeCardState {
  popupOpen: boolean;
}

class AvatarEmployeeCard extends React.Component<Extendable<EmployeeCardProps>, AvatarEmployeeCardState> {
  state = { popupOpen: false };
  isPopupClosing = false;

  setPopupOpen(newOpen) {
    if (!newOpen) {
      this.schedulePopupClose();
    } else {
      this.isPopupClosing = false;
      this.setState({ popupOpen: true });
    }
  }

  schedulePopupClose = () => {
    this.isPopupClosing = true;
    setTimeout(() => {
      if (this.isPopupClosing) {
        this.setState({ popupOpen: false });
      }

      this.isPopupClosing = false;
    }, 500);
  };

  render() {
    const { firstName, lastName, email, location, position, status, team, phone, avatar } = this.props;
    return (
      <Popup
        open={this.state.popupOpen}
        position="after"
        align="top"
        onOpenChange={(e, newProps) => {
          this.setState({ popupOpen: newProps.open });
        }}
        trigger={Avatar.create(avatar, {
          defaultProps: () => ({
            name: `${firstName} ${lastName}`,
            onMouseEnter: () => {
              this.setPopupOpen(true);
            },
            onMouseLeave: () => {
              this.setPopupOpen(false);
            },
          }),
        })}
        content={{
          styles: { marginLeft: '10px' },
          content: (
            <EmployeeCard
              firstName={firstName}
              lastName={lastName}
              position={position}
              location={location}
              status={status}
              team={team}
              email={email}
              avatar={avatar}
              phone={phone}
              onMouseEnter={() => {
                this.setPopupOpen(true);
              }}
              onMouseLeave={() => {
                this.setPopupOpen(false);
              }}
            />
          ),
        }}
      />
    );
  }
}

export default AvatarEmployeeCard;
