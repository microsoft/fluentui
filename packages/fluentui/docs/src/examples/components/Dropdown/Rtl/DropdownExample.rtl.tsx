import * as React from 'react';
import { Dropdown } from '@fluentui/react-experimental';

const inputItems = ['ا يجلبه إلينا الأس', 'الإنسان ', 'الحكيم عليه', 'أن يمسك'];

const DropdownExampleRtl = () => <Dropdown items={inputItems} placeholder="اختر بطلك" />;

export default DropdownExampleRtl;
