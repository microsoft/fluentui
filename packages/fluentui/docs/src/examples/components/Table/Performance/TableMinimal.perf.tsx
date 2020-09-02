import { Table } from '@fluentui/react-northstar';
import * as React from 'react';

const TableMinimalPerf = () => <Table />;

TableMinimalPerf.iterations = 5000;
TableMinimalPerf.filename = 'TableMinimal.perf.tsx';

export default TableMinimalPerf;
