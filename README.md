# Nuxt App

This project is a **Nuxt 3** application built with **TypeScript**, **Tailwind CSS**, and several other modern web technologies. The application leverages various tools and libraries to provide a secure, scalable, and feature-rich environment.

## Features

- **Nuxt 3** for server-side rendering and powerful routing.
- **Tailwind CSS** with custom plugins for responsive and flexible UI design.
- **JWT Authentication** using `jsonwebtoken` for secure user sessions.
- **MongoDB** integration via `nuxt-mongoose`.
- **i18n (Internationalization)** with `@nuxtjs/i18n`.
- **Prettier** and **ESLint** for consistent code formatting and linting.
- **bcrypt** for password hashing.
- **Rate limiting** using `express-rate-limit`.
  
### Core Dependencies

- **Nuxt 3**: The core of the application, used for server-side rendering and routing.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **bcrypt**: Secure password hashing library.
- **jsonwebtoken**: JWT token-based authentication.
- **Zod**: Schema validation and data parsing.
- **clsx**: Utility for conditionally joining classNames.
- **uuid**: Generate unique IDs.
- **MongoDB**: Database integration via `nuxt-mongoose`.
  
### Development Dependencies

- **@nuxt/eslint**: ESLint configuration for Nuxt projects.
- **@nuxtjs/tailwindcss**: Tailwind CSS integration for Nuxt.
- **@nuxtjs/i18n**: Internationalization support.
- **@pinia/nuxt**: State management with Pinia.
- **Prettier**: Code formatter.
- **@nuxtjs/google-fonts**: Google Fonts integration.
- **@nuxtjs/color-mode**: Support for light/dark theme toggling.

## Setup

### Prerequisites

- Node.js (v16+)
- Bun (as the package manager)
  
### Installation

Install dependencies using Bun:

```bash
bun install
```

### Development

To start the development server:

```bash
bun run dev
```

### Production

To build the project for production:

```bash
bun run build
```

To preview the production build:

```bash
bun run preview
```

### Linting & Formatting
- **Lint** the project using ESLint:

```bash
bun run lint
```

- **Format** the project using Prettier:

```bash
bun run format
```

### Project Structure

`pages/`: Nuxt 3 pages for routing.
`components/`: Vue components for the application.
`server/`: API and middlewares.
`store/`: Pinia stores for state management.
