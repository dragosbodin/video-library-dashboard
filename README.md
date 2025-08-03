# video-library-dashboard

## Important files in the project structure

```bash
src/
├── client/
│   ├── core/ # Core client components and hooks
│   ├── pages/ # Page route components
│   ├── router/ # React router setup
│   ├── styles/
│   ├── ui/ # Shared UI components
│   └── main.tsx # Entry point for the client application
├── constants/
├── server/
│   ├── api/ # API routes and procedures
│   ├── core/ 
│   │   ├── applicationMiddlewares.ts # Core middlewares for the server
│   │   ├── createServer.ts # Core server setup
│   ├── database/
│   │   ├── seeders/ # Database seeders for initial data
│   │   ├── database.ts # Database connection and setup
│   │   └── schema.prisma # Database schema
│   ├── web/ # Web page routes
│   ├── index.html.ejs # HTML template for the server
│   └── index.ts # Entry point for the server application
├── types/
```

## Technologies

- [React](https://react.dev/) - Frontend javascript framework in combination with [React Router](https://reactrouter.com/), used for the UI with [Vite](https://vite.dev/) for blazing fast local development
- [Ant Design](https://ant.design/components/overview/) - Mature UI component library for rapid prototyping
- [Express](https://expressjs.com/) - Lightweight node framework, used for the backend API with [nodemon](https://nodemon.io/) for fast reloading during development
- [tRPC](https://trpc.io/) - End to end type safe API, would only use this if the whole stack is javascript based, otherwise would use plain REST controllers in express
- [Tanstack Query](https://tanstack.com/query) - Data fetching library, used for managing API calls and caching in combination with tRPC
- [Zod](https://zod.dev/) - Schema validation library, used for validating API requests
- [Prisma](https://www.prisma.io/) - ORM for database access, used for database schema, queries and mutations
- [SQLite](https://sqlite.org/) - Lightweight database, with more time PostgreSQL would have been the better option to allow for relational modelling, more complex queries and better performance

## Setup instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up the database: `npm run db:push`
4. Seed the database: `npm run db:seed`
5. Run the development server: `npm run dev`
6. Open [http://localhost:8080](http://localhost:8080) in your browser to access the application 
7. Open [http://localhost:5555](http://localhost:5555) in your browser to view the Prisma database studio

## Future improvements

- Testing
  - Add integration tests for the Video list page and Create video page using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [MSW](https://mswjs.io/) and [vitest](https://vitest.dev/)
  - Add unit tests for the API endpoints using [supertest](https://github.com/forwardemail/supertest?tab=readme-ov-file) and [vitest](https://vitest.dev/)
  - Add integration tests for endpoints and database integration
  - Add end-to-end tests for the application using [Playwright](https://playwright.dev/) and [MSW](https://mswjs.io/)
  - Axe testing for accessibility compliance
- Validation
  - Add validation to API responses using Zod
  - Convert the client side validation to use Zod
- Database
  - Setup a PostgreSQL database for better performance and relational modelling such as normalisation of video tags
  - Indexing for faster queries such as filtering by video titles
- UI & UX
  - Error boundarys for better error handling
  - Responsive breakpoints for mobile and tablet devices
  - Pagination for better performance with large datasets
- Performance
  - Assuming this dashboard sits behind authentication and authorisation, client side rendering has been selected for simplicity and reduced compute costs, however server side rendering could be used to improve performance and SEO
  - Code splitting by page routes to reduce the initial bundle size
  - Uploading and serving static assets from a CDN