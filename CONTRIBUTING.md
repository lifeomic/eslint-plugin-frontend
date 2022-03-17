# Getting Involved

Howdy! Want to get involved by writing some cool ESLint rules? You're in the right place. Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Guidance

### Writing rules

We follow the rules outlined [by ESLint](https://eslint.org/docs/developer-guide/working-with-rules), where the main directory is `lib` and `rules` live inside of that directory.

### Writing Tests

Tests live under the `tests` directory. For tests, we follow the rules outlined [by ESLint](https://eslint.org/docs/developer-guide/working-with-rules#rule-unit-tests-1) in their developer guides.

### Writing Suggestion Docs

Each rule should have a corresponding markdown file documenting when to use the rule and what issues it solves. These live under the `docs` directory.

### Releases

This project releases using [`semantic-release`](https://github.com/semantic-release/semantic-release). Merged PRs are released immediately based on commit messages matching [the conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/).