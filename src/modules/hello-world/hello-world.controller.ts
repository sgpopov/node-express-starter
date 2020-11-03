import * as HttpStatus from 'http-status-codes';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
} from 'routing-controllers';

@JsonController('/hello-world')
class HelloWorldController {
  @Get('/')
  index() {
    return {
      variable: 'EXAMPLE_VARIABLE',
      value: process.env.EXAMPLE_VARIABLE,
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return {
      message: `This action returns a single record with ID ${id}`,
    };
  }

  @Post('/')
  post(@Body() data: any) {
    // eslint-disable-next-line no-console
    console.log(data);

    return {
      message: 'Creating a new record',
    };
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() data: any) {
    // eslint-disable-next-line no-console
    console.log(id, data);

    return {
      message: 'Updating a record',
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): void {
    // eslint-disable-next-line no-console
    console.log(id);

    // deleting a record
  }
}

export default HelloWorldController;
