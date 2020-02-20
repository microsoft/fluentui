import * as React from 'react'
import { Alert, Button, Flex, Popup } from '@fluentui/react'

const contentWithButtons = (
  <Flex gap="gap.smaller">
    <Button>First</Button>
    <Button primary>Second</Button>
  </Flex>
)

class PopupExampleOnWithFocusTrap extends React.Component {
  state = { alert: false }

  showAlert = () => {
    this.setState({ alert: true })
    setTimeout(() => this.setState({ alert: false }), 2000)
  }

  render() {
    return (
      <>
        <Flex gap="gap.smaller">
          <Popup
            trigger={<Button icon="more" content="Click" aria-label="Click button" />}
            content={contentWithButtons}
            trapFocus
            on="click"
          />
          <Popup
            trigger={<Button icon="more" content="Hover" aria-label="Hover button" />}
            content={contentWithButtons}
            trapFocus
            on="hover"
          />
          <Popup
            trigger={<Button icon="more" content="Focus" aria-label="Focus button" />}
            content={contentWithButtons}
            trapFocus
            on="focus"
          />
          <Popup
            trigger={
              <Button
                icon="more"
                content="Context"
                aria-label="Context button"
                onClick={this.showAlert}
              />
            }
            content={contentWithButtons}
            trapFocus
            on="context"
          />
        </Flex>
        {this.state.alert && <Alert warning content="Click!" />}
      </>
    )
  }
}

export default PopupExampleOnWithFocusTrap
