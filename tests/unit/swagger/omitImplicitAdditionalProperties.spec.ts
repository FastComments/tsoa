import 'mocha';
import { expect } from 'chai';
import { MetadataGenerator } from '@fastcomments/tsoa-cli/metadataGeneration/metadataGenerator';
import { SpecGenerator2 } from '@fastcomments/tsoa-cli/swagger/specGenerator2';
import { SpecGenerator3 } from '@fastcomments/tsoa-cli/swagger/specGenerator3';
import { DefaultRouteGenerator } from '@fastcomments/tsoa-cli/routeGeneration/defaultRouteGenerator';
import { ExtendedSpecConfig } from '@fastcomments/tsoa-cli/cli';
import { TsoaRoute } from '@fastcomments/tsoa-runtime';
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions';

describe('omitImplicitAdditionalProperties', () => {
  const metadata = new MetadataGenerator('./fixtures/controllers/openSpecModelsController.ts').Generate();
  const base: ExtendedSpecConfig = { ...getDefaultExtendedOptions(), noImplicitAdditionalProperties: 'throw-on-extras' };
  const open: ExtendedSpecConfig = { ...base, omitImplicitAdditionalProperties: true };

  it('leaves additionalProperties out of OpenAPI 3 models with no index signature', () => {
    const schemas = new SpecGenerator3(metadata, open).GetSpec().components.schemas!;
    expect(schemas['OpenSpecModel']).to.not.have.property('additionalProperties');
  });

  it('leaves additionalProperties out of Swagger 2 models with no index signature', () => {
    const definitions = new SpecGenerator2(metadata, open).GetSpec().definitions!;
    expect(definitions['OpenSpecModel']).to.not.have.property('additionalProperties');
  });

  it('leaves additionalProperties out of the object type', () => {
    const op = new SpecGenerator3(metadata, open).GetSpec().paths['/OpenSpecTest/object'].get!;
    expect(op.responses['200'].content!['application/json'].schema).to.not.have.property('additionalProperties');
  });

  it('keeps an index signature as additionalProperties', () => {
    const schemas = new SpecGenerator3(metadata, open).GetSpec().components.schemas!;
    expect(schemas['OpenSpecIndexedModel'].additionalProperties).to.deep.equal({ type: 'string' });
  });

  it('still closes models in the spec when not set', () => {
    const schemas = new SpecGenerator3(metadata, base).GetSpec().components.schemas!;
    expect(schemas['OpenSpecModel'].additionalProperties).to.equal(false);
  });

  it('keeps rejecting extra request properties at runtime', () => {
    const routes = new DefaultRouteGenerator(metadata, {
      entryFile: '',
      routesDir: './build',
      noImplicitAdditionalProperties: 'throw-on-extras',
      bodyCoercion: true,
    });
    const models: TsoaRoute.Models = routes.buildModels();
    const model = models['OpenSpecModel'] as TsoaRoute.RefObjectModelSchema;
    expect(model.additionalProperties).to.equal(false);
  });
});
