# require-react-intl-define-messages

In apps using `react-intl`, if using the "on-the-fly" approach of defining intl strings, it is recommended to wrap all messages in `defineMessages`.

## Examples

We can accomplish this by converting the following:

```javascript
import * as React from "react";

const messages = {
  foo: {
    id: "foo",
    defaultMessage: "foo",
  },
};
```

to:

```javascript
import * as React from "react";
import { defineMessages } from "react-intl";

const messages = defineMessages({
  foo: {
    id: "foo",
    defaultMessage: "foo",
  },
});
```

## Notes

- This plugin only checks for variables named `messages`.
