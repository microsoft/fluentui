import * as React from 'react'
import { Button, Dialog } from '@fluentui/react'
import { useBooleanKnob } from '@fluentui/docs-components'

const DialogExampleHeaderAction: React.FC = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })
  return (
    <Dialog
      open={open}
      onOpen={() => setOpen(true)}
      onCancel={() => setOpen(false)}
      onConfirm={() => setOpen(false)}
      confirmButton="Confirm"
      content="Are you sure you want to confirm this action?"
      header="Action confirmation"
      headerAction={{ icon: 'close', title: 'Close', onClick: () => setOpen(false) }}
      trigger={<Button content="Open a dialog" />}
    />
  )
}

export default DialogExampleHeaderAction
