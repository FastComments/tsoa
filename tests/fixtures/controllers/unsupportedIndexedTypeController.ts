import { Get, Route } from '@fastcomments/tsoa-runtime';
import { ForeignIndexedValue } from '../testModel';

@Route('UnsupportedIndexedType')
export class UnsupportedIndexedTypeController {
  @Get('Value')
  public async getValue(): Promise<ForeignIndexedValue> {
    return 'FOO';
  }
}
