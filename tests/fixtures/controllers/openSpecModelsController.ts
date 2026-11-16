import { Route, Get, Post, Body } from '@fastcomments/tsoa-runtime';

export interface OpenSpecModel {
  name: string;
}

export interface OpenSpecIndexedModel {
  name: string;
  [key: string]: string;
}

@Route('OpenSpecTest')
export class OpenSpecModelsController {
  @Post('thing')
  public async saveThing(@Body() body: OpenSpecModel): Promise<OpenSpecIndexedModel> {
    return { name: body.name };
  }

  @Get('object')
  public async getObject(): Promise<object> {
    return {};
  }
}
