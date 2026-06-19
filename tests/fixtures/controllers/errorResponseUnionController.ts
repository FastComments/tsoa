import { Route, Get } from '@fastcomments/tsoa-runtime';

export interface SplitSuccessModel {
  ok: boolean;
}

export interface SplitErrorModel {
  code: string;
}

@Route('SplitTest')
export class ErrorResponseUnionController {
  @Get('thing')
  public async getThing(): Promise<SplitSuccessModel | SplitErrorModel> {
    return { ok: true };
  }
}
