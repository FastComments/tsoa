import { Controller, Get, Route } from '@fastcomments/tsoa-runtime';
import type { TestModel } from '../testModel.js';

@Route()
export class RootController extends Controller {
  @Get()
  public async rootHandler(): Promise<TestModel> {
    return {
      str: 'str',
    };
  }
}
