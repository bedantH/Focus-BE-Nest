import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, _host: ArgumentsHost) {
    const ctx = _host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 11000:
        response.status(400).json({
          statusCode: 400,
          message: exception.message,
          error: exception.code,
        });

        break;
    }
  }
}
