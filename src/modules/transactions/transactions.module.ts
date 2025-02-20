import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports:[
    MulterModule.register({
      storage:diskStorage({
        destination:'./uploads',
        filename:(req,file,cb)=>{
          const fileName = `${Date.now()}-${file.originalname}`
          cb(null,fileName)
        }
      })
    })
  ],
  controllers: [TransactionsController,],
  providers: [TransactionsService,PrismaService],
})
export class TransactionsModule {}
