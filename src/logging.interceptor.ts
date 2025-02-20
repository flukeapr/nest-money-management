import { Injectable ,NestInterceptor ,ExecutionContext,CallHandler,Logger } from "@nestjs/common";
import { Observable,map } from "rxjs";


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        console.log(`Method:${method} ${url}`);

        const now = Date.now();
        return next
        .handle()
        .pipe(
            map((data) =>
                data.map((item) => {
                    const res = {
                        id:item.id,
                        name:item.name,
                    }
                    console.log(res)
                    console.log(`After... ${Date.now() - now}ms`)
                    return res
                })
            ),
            
        );
    }
}