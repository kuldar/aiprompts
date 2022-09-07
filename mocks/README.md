# Remix Indie Stack (on Render)

_This repository (and README) is based on Remix's [Indie Stack template](https://github.com/remix-run/indie-stack). It has been modified to be easily deployable to [Render](https://render.com)._

![The Remix Indie Stack](https://repository-images.githubusercontent.com/465928257/a241fa49-bd4d-485a-a2a5-5cb8e4ee0abf)

## What's in the stack

- [Render app deployment](https://render.com) with a Node.js [Native Environment](https://render.com/docs/native-environments)
- Production-ready, Render-managed [PostgreSQL database](https://render.com/docs/databases)
- Healthcheck endpoint for [zero downtime deploys](https://render.com/docs/deploys#zero-downtime-deploys)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Initial setup: _If you just generated this project, this step has been done for you._

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

## Deployment

_It's free to deploy this example to Render, including a managed PostgreSQL database._

1. Click the **Use this template** to create a copy of this repository in your GitHub account.
2. In the [Render Dashboard](https://dashboard.render.com), click **New** --> **Blueprint** and select your copy of this repository. You may need to connect your GitHub account to Render if you haven't already done so.
3. Give your **Service Group** a name and click **Apply**.
4. When the database and service have been created, open your service's `.onrender.com` URL in a browser to see your Remix app.

See the Render [Remix Quickstart page](https://render.com/docs/deploy-remix) for more details.

### Connecting to your database

A PostgreSQL database (free for 90 days) is created automatically when you deploy the `render.yaml` at the root of this repository as a [Blueprint](https://render.com/docs/infrastructure-as-code). Using `psql`, you can connect to it using the web shell of your Remix service or [SSH directly from your development machine](https://render.com/docs/ssh).

## Testing

### Cypress

This project uses Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

The project uses [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

There is a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

The project also has a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser();
});
```

That way, you can keep your local db clean and keep your tests isolated from one another.

### Vitest

For lower level tests of utilities and individual components, the project uses `vitest`. There are DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

The project uses [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

## Credit

- Remix team for creating an innovative new project and for creating this repository's foundation with their [Indie Stacks](https://remix.run/stacks).
- [TerribleDev](https://github.com/TerribleDev) for the [inspiration and idea](https://github.com/TerribleDev/remix-render) for this Render Quickstart repository.
