import 'mocha';
import { expect } from 'chai';
import { MetadataGenerator } from '@fastcomments/tsoa-cli/metadataGeneration/metadataGenerator';
import { SpecGenerator3 } from '@fastcomments/tsoa-cli/swagger/specGenerator3';
import { ExtendedSpecConfig } from '@fastcomments/tsoa-cli/cli';
import { getDefaultExtendedOptions } from '../../fixtures/defaultOptions';

describe('errorResponseTypeNames splitting', () => {
  const metadata = new MetadataGenerator('./fixtures/controllers/errorResponseUnionController.ts').Generate();
  const base: ExtendedSpecConfig = getDefaultExtendedOptions();

  it('splits the configured error type out into a default response', () => {
    const spec = new SpecGenerator3(metadata, { ...base, errorResponseTypeNames: ['SplitErrorModel'] }).GetSpec();
    const op = spec.paths['/SplitTest/thing'].get!;
    const ok = op.responses['200'].content!['application/json'].schema as { $ref?: string; anyOf?: unknown };
    const err = op.responses['default'].content!['application/json'].schema as { $ref?: string };
    expect(ok.$ref).to.equal('#/components/schemas/SplitSuccessModel');
    expect(ok.anyOf).to.equal(undefined);
    expect(err.$ref).to.equal('#/components/schemas/SplitErrorModel');
  });

  it('leaves the union intact when no error types are configured', () => {
    const spec = new SpecGenerator3(metadata, base).GetSpec();
    const op = spec.paths['/SplitTest/thing'].get!;
    const schema = op.responses['200'].content!['application/json'].schema as { anyOf?: unknown[] };
    expect(schema.anyOf).to.have.length(2);
    expect(op.responses['default']).to.equal(undefined);
  });
});
