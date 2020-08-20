const rule = require("../../../lib/rules/jsx-no-untranslated-string-literals");
const RuleTester = require("eslint").RuleTester;

const eslintTester = new RuleTester({
  parser: require.resolve("babel-eslint"),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

eslintTester.run("jsx-no-untranslated-string-literals", rule, {
  valid: [
    {
      code: `
      <Foo bar='test'>
        {'translated string!'}
      </Foo>
    `,
    },
  ],
  invalid: [
    {
      code: `
      <Foo>
        untranslated string!
      </Foo>
    `,

      errors: [
        {
          message: `Strings displayed to users should be translated using an intl library: “untranslated string!”`,
        },
      ],
    },
  ],
});
