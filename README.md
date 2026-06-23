# With Docker

## Build docker image
`docker build -t celtra/frontend-developer-task .`

## Run docker image
`docker run -it -p 8080:80 --rm --name frontend-developer-task celtra/frontend-developer-task`


# Without Docker

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

# Node info
Version v25.2.1 was used during development