# Discount Simulator

## Introduction

This is a solution to a coding challenge, written in Typescript with other dev tooling as well.

The main logic is in `simulateDiscounts` function in `src/simulateDiscounts.ts`. The start command runs the `src/index.ts` file which calls this function with some predefined N and K values and prints the result to the console.

## Assumptions

- We delete only the _last customer ID_ of the list of skipped customer IDs from the full list of customer IDs. Not the entire skipped list.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js version 16.17.0 or higher.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:nushydude/simulate-discounts.git
   ```

2. Navigate to the project directory:

   ```bash
   cd discount-simulator
   ```

3. Install dependencies:

   ```bash
   npm ci
   ```

## Usage

To run Discount Simulator, use the following command:

```bash
npm run start
```

For development, you can run the application in watch mode:

```bash
npm run dev
```

## Testing

'
This project uses Jest for testing. To run tests, use:

```bash
npm run test
```
