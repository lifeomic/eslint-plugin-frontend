const rule = require("../../../lib/rules/require-react-intl-define-messages");
const RuleTester = require("eslint").RuleTester;

const eslintTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

eslintTester.run("require-react-intl-define-messages", rule, {
  valid: [
    `const messages = defineMessages({ foo: { id: 'foo', defaultMessage: 'foo' } })`,
    `export const messages = defineMessages({ foo: { id: 'foo', defaultMessage: 'foo' } })`,
  ],
  invalid: [
    {
      code: `const messages = { foo: { id: 'foo', defaultMessage: 'foo' } }`,
      errors: [
        {
          message: `Intl message objects should be wrapped in react-intl's "defineMessages".`,
        },
      ],
    },
  ],
});
