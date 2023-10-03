import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferredConsumerFromDto } from './dto/create-transferred-consumer-from.dto';
import { UpdateTransferredConsumerFromDto } from './dto/update-transferred-consumer-from.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferredConsumerFrom } from './entities/transferred-consumer-from.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class TransferredConsumerFromService {
  constructor(
    @InjectRepository(TransferredConsumerFrom)
    private readonly transferredConsumerFromRepository: Repository<TransferredConsumerFrom>,
  ) {}
  async create(createTransferredConsumerFromDto: CreateTransferredConsumerFromDto) {
    try {
      return await this.transferredConsumerFromRepository.save(createTransferredConsumerFromDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      return await this.transferredConsumerFromRepository
      .createQueryBuilder('transferredConsumerFrom')
      .leftJoinAndSelect('transferredConsumerFrom.consumerTransaction', 'consumerTransaction')
      .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllTransactionType(transactionType?: string, transactionFrom?: string): Promise<TransferredConsumerFrom[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
    const query = this.transferredConsumerFromRepository
      .createQueryBuilder('transferredConsumerFrom')
      .leftJoinAndSelect('transferredConsumerFrom.consumerTransaction', 'consumerTransaction')
      .leftJoinAndSelect('transferredConsumerFrom.transactionType', 'transactionType')
      .where(`consumerTransaction.date = '${currentDate}'`)
      .andWhere('consumerTransaction.transactionStatus.id = :status', { status: 1 })
      if (transactionType !== undefined) {
        query.andWhere('transferredConsumerFrom.transactionType = :transactionType', { transactionType });
      }

      if (transactionFrom !== undefined) {
        query.andWhere('transferredConsumerFrom.transactionFrom = :transactionFrom', { transactionFrom });
      }
      // query.orderBy('consumerTransaction.timeGeneratedQueue', 'ASC');
      try {
        return await query.getMany();
      } catch (error) {
        throw new NotFoundException();
      }
      
  }

  async findOne(id: number): Promise<TransferredConsumerFrom> {
    try {
      return await this.transferredConsumerFromRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateTransferredConsumerFromDto: UpdateTransferredConsumerFromDto) {
    try {
      return await this.transferredConsumerFromRepository.update(id, updateTransferredConsumerFromDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.transferredConsumerFromRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

}
