import * as _ from 'lodash';
import * as React from 'react';
import { Chat, Menu, Popup, Avatar } from '@fluentui/react-northstar';
import { AcceptIcon, LikeIcon, MoreIcon } from '@fluentui/react-icons-northstar';

/**
 * This example shows how to create custom Chat Messages.
 * There is custom styling to show the actions menu only on hover of the Message.
 * There is also inline async data fetching for shorthand slots.
 */

// Mock async data container component
class AsyncData extends React.Component<{ render: Function; data?: any }> {
  state = { loading: true };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), _.random(500, 2000));
  }

  render() {
    const { loading } = this.state;
    const { render, data } = this.props;

    return render(loading ? null : data);
  }
}

class CustomChatMessage extends React.Component {
  state = { open: false };

  togglePopup = () => this.setState({ open: !this.state.open });

  renderMenuItem = (MenuItem, props) => {
    if (props.icon !== 'thumbs up') {
      return <MenuItem {...props} />;
    }

    return (
      <Popup
        key={props.key}
        position="below"
        open={this.state.open}
        content={
          <AsyncData
            data={['User 1', 'User 2', 'User 3']}
            render={data => {
              return !data ? '...loading' : data.map(user => <div key={user}>{user}</div>);
            }}
          />
        }
        trigger={
          <AsyncData
            data={3}
            render={data => <MenuItem {...props} icon={<LikeIcon />} content={data} onClick={this.togglePopup} />}
          />
        }
      />
    );
  };

  render() {
    return (
      <Chat.Message
        styles={{
          position: 'relative',

          '& .actions': {
            transition: 'opacity 0.2s',
            position: 'absolute',
            top: '-10px',
            right: '10px',
            background: '#fff',
            boxShadow: '0px 2px 4px #ddd',
            opacity: 0,
          },

          ':hover': {
            '& .actions': { opacity: 1 },
          },
        }}
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
        content={
          <div>
            Hover me to see the actions and async like count.
            <br />
            Avatars and statuses are also async.
            <Menu
              iconOnly
              className="actions"
              items={[
                {
                  icon: <LikeIcon />,
                  key: 'a',
                  children: this.renderMenuItem,
                },
                {
                  icon: <AcceptIcon />,
                  key: 'b',
                  children: this.renderMenuItem,
                },
                {
                  icon: <MoreIcon />,
                  key: 'c',
                  children: this.renderMenuItem,
                },
              ]}
            />
          </div>
        }
      />
    );
  }
}

const gutterContent = (
  <AsyncData
    data="public/images/avatar/RobinCounts.jpg"
    render={data => (
      <Avatar
        image={data}
        status={renderStatus => (
          <AsyncData
            data="available"
            render={statusData =>
              renderStatus({
                color: statusData === 'available' ? 'green' : undefined,
                icon: statusData === 'available' ? <AcceptIcon /> : undefined,
              })
            }
          />
        )}
      />
    )}
  />
);

const AsyncShorthand = () => (
  <Chat
    items={[
      { key: 'a', gutter: gutterContent, message: <CustomChatMessage /> },
      { key: 'b', gutter: gutterContent, message: <CustomChatMessage /> },
      { key: 'c', gutter: gutterContent, message: <CustomChatMessage /> },
    ]}
  />
);

export default AsyncShorthand;
