import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionStatusDto } from './dto/create-transaction-status.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionStatus } from './entities/transaction-status.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TransactionStatusService {
  constructor(
    @InjectRepository(TransactionStatus)
    private readonly transactionStatusRepository: Repository<TransactionStatus>,
  ) {}

  async create(createTransactionStatusDto: CreateTransactionStatusDto) {
    const { name } = createTransactionStatusDto;

    // Check if record with the same name already exists
    const existingRecord = await this.transactionStatusRepository.findOneBy({ name });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Save the record
    try {
      return await this.transactionStatusRepository.save(createTransactionStatusDto);
    } catch (error) {
      throw new BadRequestException();
    }
  
  }

  async findAll(): Promise<TransactionStatus[]> {
    return await this.transactionStatusRepository.find();
  }

  async findOne(id: number): Promise<TransactionStatus> {
    try {
      return  await this.transactionStatusRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateTransactionStatusDto: UpdateTransactionStatusDto) {
    const { name } = updateTransactionStatusDto;

    // Check if record with the same name already exists, excluding the current record being updated
    const existingRecord = await this.transactionStatusRepository.findOneBy({ name, id: Not(id) });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Update the record
    try {
      return await this.transactionStatusRepository.update(id, updateTransactionStatusDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.transactionStatusRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
