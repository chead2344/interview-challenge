# Feedr Technical Challenge

Thank you for taking the time to attempt this challenge.

These tests are used to evaluate candidates of all skill levels so please complete them to a level you feel is an accurate representation of your skill set.

Please read `README-FRONTEND.md` for further instructions.

If you have any questions or would like to clarify any details, please email lyz@feedr.co.

Good luck!

# Quick Start

Fork the repository, clone it to your local system, then:

## Install dependencies

yarn (or npm install)

## Start development server

yarn dev (or npm run dev)

## Run the tests

```sh
yarn test
```

## Thought process

- The first thing I did was to introduce TypeScript. I find that TypeScript is almost like a testing tool and allows me to catch typos and type errors as I write code. I find that I write fewer bugs when using TypeScript.

- For keeping track of the selected items I decided to use simple component state (with `useState`) instead of introducing anything more complex such as Redux.

- I have kept the styling to a minimum except a simple selected state when items are clicked.

- The tests are written with `jest` and `react-testing-library`. The reason I use `react-testing-library` is because it encourages writing tests that verify the behaviour instead of the implementation. I also tend to prefer writing tests from the outside-in. I have written some high level integration tests that cover the above scenarios.

- Having slept on the implementation, I didn't like the fact that the `selectedItems` were being passed around to multiple components as props. I thought it would be a cleaner implementation to use React context for this instead and a good oppportunity to demonstrate why it is important to test the behaviour and not the implementation. As can be seen from the commit history, even after such a large refactor, the tests continued to work.
