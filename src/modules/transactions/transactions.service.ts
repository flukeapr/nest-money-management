import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService,) {}
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<CreateTransactionDto> {
    try {
      return this.prisma.transaction.create({ data: createTransactionDto });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<CreateTransactionDto[]> {
    try {
      return this.prisma.transaction.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<CreateTransactionDto | null> {
    try {
      const result = await this.prisma.transaction.findUnique({
        where: { id },
      });
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<CreateTransactionDto> {
    try {
      await this.findOne(id);
      return this.prisma.transaction.update({
        where: { id },
        data: updateTransactionDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.findOne(id);
      await this.prisma.transaction.delete({ where: { id } });
      return { message: 'Transaction deleted' };
    } catch (error) {
      throw error;
    }
  }

  async  saveFile(file: Express.Multer.File) {
    try {
      if(!file){
        throw new BadRequestException('File not found')
      }
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException('invalid file type');
      }
      const maxSize = 3 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('file is too large!');
      }
      return {message:'File uploaded',filePath:file.path}
    } catch (error) {
      throw error
    }
  }
}
