import * as React from 'react'
import { Table } from '@fluentui/react'

const rowsPlain = [
  ['1', 'Roman van von der Longername', 'None', '30 years'],
  ['2', 'Alex', 'None', '1 year'],
  ['3', 'Ali', 'None', '30000000000000 years'],
]

const StaticTable = () => <Table rows={rowsPlain} aria-label="Static headless table" />

export default StaticTable
