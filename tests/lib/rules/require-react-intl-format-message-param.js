const rule = require("../../../lib/rules/require-react-intl-format-message-param");
const RuleTester = require("eslint").RuleTester;

const eslintTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

eslintTester.run("require-react-intl-format-message-param", rule, {
  valid: [
    `formatMessage({ id: 'foo', defaultMessage: 'foo' })`,
  ],
  invalid: [
     {
      code: `formatMessage({ id: 'foo' })`,
      errors: [
        {
          message: `Message descriptor passed into formatMessage is missing "defaultMessage".`,
        },
      ],
    },
    {
      code: `formatMessage({ defaultMessage: 'foo' })`,
      errors: [
        {
          message: `Message descriptor passed into formatMessage is missing "id".`,
        },
      ],
    },
    {
      code: `formatMessage(undefined)`,
      errors: [
        {
          message: `Undefined message descriptor passed into formatMessage.`,
        },
      ],
    },
    {
      code: `formatMessage({})`,
      errors: [
        {
          message: `Undefined message descriptor passed into formatMessage.`,
        },
      ],
    },
  ],
});
