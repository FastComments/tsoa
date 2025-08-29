<div align="center">
  <h1>@fastcomments/tsoa</h1>
  
**FastComments Fork of TSOA**

Express-only, optimized OpenAPI-compliant REST APIs using TypeScript and Node

[![npm version](https://img.shields.io/npm/v/@fastcomments/tsoa/latest)](https://www.npmjs.com/package/@fastcomments/tsoa)

</div>

## About This Fork

This is a FastComments maintained fork of the original [TSOA](https://github.com/lukeautry/tsoa) project. This fork includes:

- **Express-only support** - Removed Koa, Hapi and other framework dependencies for a lighter package
- **Performance optimizations** - Various improvements for better runtime performance
- **Bug fixes** - Additional fixes not yet in upstream
- **Reduced dependencies** - Cleaner dependency tree focused on Express ecosystem

The original TSOA documentation largely applies, but note that only Express is supported as a framework.

## Goal

- TypeScript controllers and models as the single source of truth for your API
- A valid OpenAPI (formerly Swagger) spec (2.0 or 3.0 if you choose 😍) is generated from your controllers and models, including:
  - Paths (e.g. GET /users)
  - Definitions based on TypeScript interfaces (models)
  - Parameters/model properties marked as required or optional based on TypeScript (e.g. myProperty?: string is optional in the OpenAPI spec)
  - jsDoc supported for object descriptions (most other metadata can be inferred from TypeScript types)
- Routes are generated for Express middleware
  - Validate request payloads

## Philosophy

- Rely on TypeScript type annotations to generate API metadata if possible
- If regular type annotations aren't an appropriate way to express metadata, use decorators
- Use jsdoc for pure text metadata (e.g. endpoint descriptions)
- Minimize boilerplate
- Models are best represented by interfaces (pure data structures), but can also be represented by classes
- Runtime validation of tsoa should behave as closely as possible to the specifications that the generated OpenAPI 2/3 schema describes. Any differences in validation logic are clarified by logging warnings during the generation of the OpenAPI Specification (OAS) and/or the routes.
  - Please note that by enabling OpenAPI 3 you minimize the chances of divergent validation logic since OpenAPI 3 has a more expressive schema syntax.

## Getting Started

- [Documentation](https://tsoa-community.github.io/docs/)
- [API Reference](https://tsoa-community.github.io/reference/)
- [Getting started guide](https://tsoa-community.github.io/docs/getting-started)

## Examples

Check out the [guides](https://tsoa-community.github.io/docs/getting-started)

See example controllers in [the tests](tests/fixtures/controllers)

See example models in [the tests](tests/fixtures/testModel.ts)

## Help wanted

### Contributing code

To contribute (via a PR), please first see the [Contributing Guide](https://github.com/lukeautry/tsoa/tree/master/docs/CONTRIBUTING.md)

### Becoming a maintainer

tsoa wants additional maintainers! The library has increased in popularity and has quite a lot of pull requests and issues. [Please post in this issue](https://github.com/lukeautry/tsoa/issues/236) if you're willing to take on the role of a maintainer.
