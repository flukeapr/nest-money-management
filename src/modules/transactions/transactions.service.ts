import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma:PrismaService) {}
  async create(createTransactionDto: CreateTransactionDto):Promise<CreateTransactionDto> {
    try {
      return this.prisma.transaction.create({data:createTransactionDto});
      
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll():Promise<CreateTransactionDto[]> {
    try {
      return this.prisma.transaction.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    
  }

  async findOne(id: number):Promise<CreateTransactionDto | null> {
    try {
      
      const result = await this.prisma.transaction.findUnique({where:{id}});
      if(!result){
        throw new NotFoundException('Transaction not found');
      }
      return result
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto):Promise<CreateTransactionDto> {
    try {
      const result = await this.findOne(id);
      if(!result){
        throw new NotFoundException('Transaction not found');
      }
      return this.prisma.transaction.update({where:{id},data:updateTransactionDto});
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
     throw new InternalServerErrorException(error.message); 
    }
  }

  async remove(id: number):Promise<{message:string}> {
    try {
      const result = await this.findOne(id);
      if(!result){
        throw new NotFoundException('Transaction not found');
      }
      await this.prisma.transaction.delete({where:{id}});
      return {message:'Transaction deleted'}
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
