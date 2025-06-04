# Sea Battle

This repository contains a simple implementation of the classic Battleship game. The project is built with [Vite](https://vitejs.dev/) and uses vanilla JavaScript modules and Sass for styling.

## Installation

1. Install the project dependencies:

```bash
npm install
```

## Development

Run the development server with hot reload:

```bash
npm run dev
```

By default the server starts on [http://localhost:3000](http://localhost:3000).

## Building

For a production build without preview run:

```bash
npm run prod
```

To build and then preview the output locally use:

```bash
npm run start
```

The bundled files are placed in the `dist` directory.

## Project Structure

```
sea-battle/
├── index.html          - entry HTML file
├── src/
│   ├── js/             - JavaScript source files
│   │   └── modules/    - modules for game logic (field, dock, etc.)
│   ├── sass/           - Sass styles
│   │   ├── blocks/     - BEM-style blocks
│   │   ├── _mixins.scss
│   │   └── _variables.scss
│   └── icons/          - SVG icons used by the app
└── vite.config.js      - Vite configuration
```

The `src/js` folder hosts the main application logic (`main.js` and module subfolders). Styles are organized under `src/sass` with separate files for each block. Icons stored in `src/icons` are bundled via Vite plugins.


