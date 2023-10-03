import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubTransactionTypeDto } from './dto/create-sub-transaction-type.dto';
import { UpdateSubTransactionTypeDto } from './dto/update-sub-transaction-type.dto';
import { SubTransactionType } from './entities/sub-transaction-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class SubTransactionTypeService {
  constructor (
    @InjectRepository(SubTransactionType)
    private readonly subTransactionTypeRepository: Repository<SubTransactionType>,
  ) {}

  async create(createSubTransactionTypeDto: CreateSubTransactionTypeDto) {
    const { name } = createSubTransactionTypeDto;
  
    // Check if record with the same name already exists
    const existingRecord = await this.subTransactionTypeRepository.findOneBy({ name });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }
  
    // Save the record and emit the event
    try {
      return await this.subTransactionTypeRepository.save(createSubTransactionTypeDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }
  

  async findAll(): Promise<SubTransactionType[]> {
    try {
      return await this.subTransactionTypeRepository
      .createQueryBuilder('subTransactionType')
      .leftJoinAndSelect('subTransactionType.transactionType', 'transactionType')
      .select(['subTransactionType.id', 'subTransactionType.name', 'transactionType'])
      .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findTransactionType(transactionType?: string): Promise<SubTransactionType[]> {
    try {
      const query = this.subTransactionTypeRepository
      .createQueryBuilder('subTransactionType')
      .leftJoinAndSelect('subTransactionType.transactionType', 'transactionType')
      .select(['subTransactionType.id', 'subTransactionType.name', 'transactionType']);
      if (transactionType !== undefined) {
        query.andWhere('subTransactionType.transactionType = :transactionType', { transactionType });
      }
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<SubTransactionType> {
    try {
      return await this.subTransactionTypeRepository
      .createQueryBuilder('subTransactionType')
      .leftJoinAndSelect('subTransactionType.transactionType', 'transactionType')
      .where('subTransactionType.id = :id', { id })
      .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateSubTransactionTypeDto: UpdateSubTransactionTypeDto) {
    const { name, transactionType } = updateSubTransactionTypeDto;

    // Check if record with the same name already exists, excluding the current record being updated
    const existingRecord = await this.subTransactionTypeRepository.findOneBy({ name, transactionType, id: Not(id) });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Update the record
    try {
      return await this.subTransactionTypeRepository.update(id, updateSubTransactionTypeDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.subTransactionTypeRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
