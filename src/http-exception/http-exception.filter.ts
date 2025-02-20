
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const logger = new Logger('HttpExceptionFilter',{timestamp:true})


     response
      .status(status)
      .json({
        error: exception.name,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception['response']['message'],
      });

    logger.error(exception);
  }
}
