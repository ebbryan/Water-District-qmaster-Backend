import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsumerTransactionDto } from './dto/create-consumer-transaction.dto';
import { UpdateConsumerTransactionDto } from './dto/update-consumer-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumerTransaction } from './entities/consumer-transaction.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';

@Injectable()
export class ConsumerTransactionService {
  constructor(
    @InjectRepository(ConsumerTransaction)
    private readonly consumerTransactionRepository: Repository<ConsumerTransaction>,
  ) {}

  async create(createConsumerTransactionDto: CreateConsumerTransactionDto): Promise<ConsumerTransaction> {
    const { name, transactionStatus, transactionType } = createConsumerTransactionDto;
    // const existingRecord = await this.consumerTransactionRepository
    //   .createQueryBuilder('consumerTransaction')
    //   .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
    //   .where('consumerTransaction.name = :name', { name })
    //   .andWhere('transactionStatus.id = :transactionStatus', { transactionStatus: transactionStatus })
    //   .getOne();
  
    // if (existingRecord) {
    //   throw new ConflictException('Record already exists');
    // }
  
    const MAX_RNG_VALUE = 999; // Define your limit here
  
    const currentDate = new Date(); // Get current date
    const currentDay = currentDate.getDate();
  
    const lastRecord = await this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
      .where('transactionType.id = :transactionType', { transactionType: transactionType })
      .orderBy('consumerTransaction.date', 'DESC')
      .addOrderBy('consumerTransaction.rng', 'DESC')
      .getOne();
  
    let rngValue: number;
  
    if (lastRecord) {
      const lastRecordDate = new Date(lastRecord.date).getDate();
      const lastRecordRng = parseInt(lastRecord.rng);
  
      if (lastRecordDate !== currentDay) {
        rngValue = 1; // Reset to 1 on a new day
      } else {
        rngValue = lastRecordRng + 1; // Increment the rng value
      }
  
      // Reset to 1 if it exceeds the limit
      if (rngValue > MAX_RNG_VALUE) {
        rngValue = 1;
      }
    } else {
      rngValue = 1; // First record
    }
  
    const paddedRngValue = rngValue.toString().padStart(3, '0');
    createConsumerTransactionDto.rng = paddedRngValue;
  
    try {
      return await this.consumerTransactionRepository.save(createConsumerTransactionDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }  

  // Jeric
  async findAllServingTransactions(): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
    return (
      this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.counterPersonnel','counterPersonnel')
      .leftJoinAndSelect('consumerTransaction.transactionType','transactionType')
      .leftJoinAndSelect('consumerTransaction.transactionStatus','transactionStatus')
      .where(`transactionStatus.name LIKE '%SERVING%'`)
      .andWhere('counterPersonnel.isActive = :isActiveStatus', {isActiveStatus: true})
      .andWhere(`transactionType.name NOT LIKE '%PAYMENT%'`)
      .andWhere(`consumerTransaction.date = '${currentDate}'`)
      .orderBy('counterPersonnel.tag', 'ASC')
      .getMany()
    );
  }

  async findAllDropTransactions(): Promise<ConsumerTransaction[]> {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 8); // "9:05:00"
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
  
    // const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
    // const nextHourTime = nextHour.toTimeString().slice(0, 8); // "10:05:00"
  
    return (
      this.consumerTransactionRepository
        .createQueryBuilder('consumer_transaction')
        .leftJoinAndSelect('consumer_transaction.counterPersonnel', 'counter_personnel')
        .leftJoinAndSelect('consumer_transaction.transactionType', 'transaction_type')
        .where('consumer_transaction.transactionType.id = counter_personnel.transactionType.id')
        .andWhere('consumer_transaction.transactionStatus.id = :status', { status: 4 })
        // .andWhere('consumer_transaction.dropTime >= :currentTime', { currentTime })
        .andWhere('consumer_transaction.dropExpiration > :currentTime', { currentTime })
        .andWhere(`consumer_transaction.date = '${currentDate}'`)
        .orderBy('consumer_transaction.dropTime', 'ASC')
        .getMany()
    );
  }

  async findAllServingTransactionsPayment(): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
    return (
      this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.counterPersonnel','counterPersonnel')
      .leftJoinAndSelect('consumerTransaction.transactionType','transactionType')
      .leftJoinAndSelect('consumerTransaction.transactionStatus','transactionStatus')
      .where(`transactionStatus.name LIKE '%SERVING%'`)
      .andWhere('counterPersonnel.isActive = :isActiveStatus', {isActiveStatus: true})
      .andWhere(`transactionType.name LIKE '%PAYMENT%'`)
      .andWhere(`consumerTransaction.date = '${currentDate}'`)
      .orderBy('counterPersonnel.tag', 'ASC')
      .getMany()
    );
  }

  async findAll(): Promise<ConsumerTransaction[]> {
    try {
      return await this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
      .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
      .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
      .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
      .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
      .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllCurrentDatePendingCw(): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD'); // get the current system date in local timezone
    // const currentDate: string = new Date().toISOString().substring(0, 10); // this also get the date but late 1 hour

    try {
      return await this.consumerTransactionRepository
        .createQueryBuilder('consumerTransaction')
        .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
        .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
        .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
        .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
        .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
        .where(`consumerTransaction.date = '${currentDate}'`)
        .andWhere(`transactionStatus.name LIKE '%PENDING%'`)
        .andWhere(`transactionType.name NOT LIKE '%PAYMENT%'`) 
        .orderBy('consumerTransaction.timeGeneratedQueue', 'ASC')
        .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllCurrentDatePendingCwDesc(): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD'); // get the current system date in local timezone
    // const currentDate: string = new Date().toISOString().substring(0, 10); // this also get the date but late 1 hour

    try {
      return await this.consumerTransactionRepository
        .createQueryBuilder('consumerTransaction')
        .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
        .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
        .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
        .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
        .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
        .where(`consumerTransaction.date = '${currentDate}'`)
        .andWhere(`transactionStatus.name LIKE '%PENDING%'`)
        .andWhere(`transactionType.name NOT LIKE '%PAYMENT%'`) 
        .orderBy('consumerTransaction.timeGeneratedQueue', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllCurrentDatePendingPayment(): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD'); // get the current system date in local timezone
    // const currentDate: string = new Date().toISOString().substring(0, 10); // this also get the date but late 1 hour

    try {
      return await this.consumerTransactionRepository
        .createQueryBuilder('consumerTransaction')
        .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
        .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
        .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
        .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
        .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
        .where(`consumerTransaction.date = '${currentDate}'`) 
        .andWhere(`transactionStatus.name LIKE '%PENDING%'`)
        .andWhere(`transactionType.name LIKE '%PAYMENT%'`) 
        .orderBy('consumerTransaction.timeGeneratedQueue', 'ASC')
        .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllCurrentDatePendingPaymentDesc(): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD'); // get the current system date in local timezone
    // const currentDate: string = new Date().toISOString().substring(0, 10); // this also get the date but late 1 hour

    try {
      return await this.consumerTransactionRepository
        .createQueryBuilder('consumerTransaction')
        .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
        .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
        .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
        .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
        .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
        .where(`consumerTransaction.date = '${currentDate}'`)
        .andWhere(`transactionStatus.name LIKE '%PENDING%'`)
        .andWhere(`transactionType.name LIKE '%PAYMENT%'`) 
        .orderBy('consumerTransaction.timeGeneratedQueue', 'DESC')
        .getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllTransactionStatus(
    transactionStatus?: string,
    consumerPriority?: string,
    counterPersonnel?: string,
    transactionType?: string
  ): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
    const query = this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
      .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
      .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
      .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
      .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
      .where(`consumerTransaction.date = '${currentDate}'`);
  
    if (transactionStatus !== undefined) {
      query.andWhere('consumerTransaction.transactionStatus = :transactionStatus', { transactionStatus });
    }
  
    if (consumerPriority !== undefined) {
      query.andWhere('consumerTransaction.consumerPriority = :consumerPriority', { consumerPriority });
    }
  
    if (counterPersonnel !== undefined) {
      query.andWhere('consumerTransaction.counterPersonnel = :counterPersonnel', { counterPersonnel });
    }
  
    if (transactionType !== undefined) {
      query.andWhere('consumerTransaction.transactionType = :transactionType', { transactionType });
    }
    
    query.orderBy('consumerTransaction.timeGeneratedQueue', 'ASC');
  
    try {
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }
  
  async findAllTransactionByDate(
    subTransactionType,
    date?: string,
    startDate?: string,
    endDate?: string
  ): Promise<ConsumerTransaction[]> {
    const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD');
    const query = this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
      .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
      .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
      .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
      .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')

    if (subTransactionType !== undefined) {
      query.andWhere('consumerTransaction.subTransactionTypee = :subTransactionType', { subTransactionType });
    }

    if (startDate !== undefined && endDate !== undefined) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      query.andWhere('consumerTransaction.date BETWEEN :startDate AND :endDate', { startDate, endDate});
    }
    
    query.andWhere(`transactionStatus.name LIKE '%COMPLETE%'`)
    query.orderBy('consumerTransaction.date', 'ASC');
  
    try {
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllTransferred(transferredFrom?: string): Promise<ConsumerTransaction[]> {
    const query = this.consumerTransactionRepository
    .createQueryBuilder('consumerTransaction')
    if (transferredFrom !== undefined) {
      query.andWhere('consumerTransaction.transferredFrom = :transferredFrom', { transferredFrom });
    }
    query.orderBy('consumerTransaction.timeGeneratedQueue', 'ASC');

    try {
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<ConsumerTransaction> {
    try {
      return await this.consumerTransactionRepository
      .createQueryBuilder('consumerTransaction')
      .leftJoinAndSelect('consumerTransaction.subTransactionType', 'subTransactionType')
      .leftJoinAndSelect('consumerTransaction.transactionStatus', 'transactionStatus')
      .leftJoinAndSelect('consumerTransaction.transactionType', 'transactionType')
      .leftJoinAndSelect('consumerTransaction.consumerPriority', 'consumerPriority')
      .leftJoinAndSelect('consumerTransaction.counterPersonnel', 'counterPersonnel')
      .where('consumerTransaction.id = :id', { id })
      .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateConsumerTransactionDto: UpdateConsumerTransactionDto) {
    try {
      return await this.consumerTransactionRepository.update(
        id,
        updateConsumerTransactionDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async delete(id: number) {
    try {
      return await this.consumerTransactionRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  } 
}
