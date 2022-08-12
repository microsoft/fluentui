import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions } from '@fluentui/react-dialog';
import { Button, FluentProvider } from '@fluentui/react-components';

export const RTL = () => {
  return (
    <FluentProvider dir="rtl">
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface aria-label="label">
          <DialogTitle>כותרת דו-שיח</DialogTitle>
          <DialogBody>
            Lדת חינוך תבניות חרטומים אחר. ב שכל החלל החופשית. בה ספורט משופרות שתי. של יידיש בחירות כדי, על ניהול
            קרימינולוגיה אחר. חפש עיצוב ערכים מועמדים או, בשפה הבהרה כתב מה. בלשנות בויקיפדיה ב זכר, ב אחד כדור קולנוע
            חרטומים. בעברית הספרות מה עזה. של מתן למנוע הראשי בקלות. בה מדע תחבורה הקהילה, עזה ובמתן בהבנה טכניים גם.
            הראשי והנדסה אחר ב, ויש ישראל אירועים פילוסופיה אל, אחר זכויות האטמוספירה מה. חשמל בעברית החופשית על ארץ.
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">סגור</Button>
            </DialogTrigger>
            <Button appearance="primary">לעשות משהו</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </FluentProvider>
  );
};
