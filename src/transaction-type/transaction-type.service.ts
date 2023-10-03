import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionType } from './entities/transaction-type.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TransactionTypeService {
  constructor (
    @InjectRepository(TransactionType)
    private readonly transactionTypeRepository: Repository<TransactionType>,
  ) {}
  async create(createTransactionTypeDto: CreateTransactionTypeDto) {
    const { name } = createTransactionTypeDto;

    // Check if record with the same name already exists
    const existingRecord = await this.transactionTypeRepository.findOneBy({ name });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Save the record
    try {
      return await this.transactionTypeRepository.save(createTransactionTypeDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<TransactionType[]> {
    return await this.transactionTypeRepository.find();
  }

  async findOne(id: number): Promise<TransactionType> {
    try {
      return await this.transactionTypeRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateTransactionTypeDto: UpdateTransactionTypeDto) {
    const { name } = updateTransactionTypeDto;

    // Check if record with the same name already exists, excluding the current record being updated
    const existingRecord = await this.transactionTypeRepository.findOneBy({ name, id: Not(id) });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Update the record
    try {
      return await this.transactionTypeRepository.update(id, updateTransactionTypeDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.transactionTypeRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}