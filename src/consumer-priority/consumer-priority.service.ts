import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsumerPriorityDto } from './dto/create-consumer-priority.dto';
import { UpdateConsumerPriorityDto } from './dto/update-consumer-priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumerPriority } from './entities/consumer-priority.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ConsumerPriorityService {
  constructor(
    @InjectRepository(ConsumerPriority)
    private readonly consumerPriorityRepository: Repository<ConsumerPriority>,
  ) {}

  async create(createConsumerPriorityDto: CreateConsumerPriorityDto) {
    const { name } = createConsumerPriorityDto;

    // Check if record with the same name already exists
    const existingRecord = await this.consumerPriorityRepository.findOneBy({ name });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Save the record
    try {
      return await this.consumerPriorityRepository.save(createConsumerPriorityDto);
    } catch (error) {
      throw new BadRequestException;
    }
  }

  async findAll(): Promise<ConsumerPriority[]> {
    return await this.consumerPriorityRepository.find();
  }

  async findOne(id: number): Promise<ConsumerPriority> {
    try {
      return await this.consumerPriorityRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateConsumerPriorityDto: UpdateConsumerPriorityDto) {
    const { name } = updateConsumerPriorityDto;

    // Check if record with the same name already exists, excluding the current record being updated
    const existingRecord = await this.consumerPriorityRepository.findOneBy({ name, id: Not(id) });
    if (existingRecord) {
      throw new ConflictException('Record with the same name already exists');
    }

    // Update the record
    try {
      return await this.consumerPriorityRepository.update(id, updateConsumerPriorityDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.consumerPriorityRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
