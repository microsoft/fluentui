import * as React from 'react';
import { List, Image } from '@fluentui/react-northstar';

const items = [
  {
    key: 'irving',
    media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/matt.jpg" avatar />,
    header: 'ايرفينغ كوهيك',
    headerMedia: '7:26:56 AM',
    content: 'برنامج الاستشعار إلى التنبيه SAS من خلال بطاقة SQL ملحن!',
  },
  {
    key: 'skyler',
    media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/steve.jpg" avatar />,
    header: 'سكايلر باركس',
    headerMedia: '11:30:17 PM',
    content: 'استخدم تطبيق FTP عبر الإنترنت لإدخال تطبيق متعدد البايت!',
  },
  {
    key: 'dante',
    media: <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/nom.jpg" avatar />,
    header: 'دانتي شنايدر',
    headerMedia: '5:22:40 PM',
    content: 'بكسل GB لأسفل ، وتصفح الواجهة الافتراضية!',
  },
];

const ListExampleRtl = () => <List items={items} />;

export default ListExampleRtl;
