import { Route, Get } from '@fastcomments/tsoa-runtime';
import { ModelService } from '../services/modelService';

// Two controllers with distinct routes but a like-named method -> same generated operationId ("GetModel").
// Passes the method-signature duplicate check, so it exercises the operationId uniqueness check.

@Route('OpIdA')
export class DuplicateOperationIdAController {
  @Get('a')
  public async getModel() {
    return new ModelService().getModel();
  }
}

@Route('OpIdB')
export class DuplicateOperationIdBController {
  @Get('b')
  public async getModel() {
    return new ModelService().getModel();
  }
}
