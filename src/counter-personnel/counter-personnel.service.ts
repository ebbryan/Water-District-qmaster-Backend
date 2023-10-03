import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCounterPersonnelDto } from './dto/create-counter-personnel.dto';
import { UpdateCounterPersonnelDto } from './dto/update-counter-personnel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CounterPersonnel } from './entities/counter-personnel.entity';
import { Not, Repository } from 'typeorm';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class CounterPersonnelService {
  constructor(
    @InjectRepository(CounterPersonnel)
    private readonly counterPersonnelRepository: Repository<CounterPersonnel>,
  ) {}

  async create(createCounterPersonnelDto: CreateCounterPersonnelDto) {
    const saltOrRounds = await genSalt();
    const hashedPassword = await hash(
      createCounterPersonnelDto.password,
      saltOrRounds,
    );
    const newUser = { ...createCounterPersonnelDto, password: hashedPassword };
    const { username, firstname, lastname } = createCounterPersonnelDto;

    // Check if record with the same name already exists
    const existingRecord = await this.counterPersonnelRepository.findOne({
      where: [{ username }, { firstname, lastname }],
    });
    if (existingRecord) {
      throw new ConflictException('Record already exists');
    }

    // Save the record
    try {
      return await this.counterPersonnelRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<CounterPersonnel[]> {
    const query = this.counterPersonnelRepository
      .createQueryBuilder('counterPersonnel')
      .leftJoinAndSelect('counterPersonnel.transactionType', 'transactionType');
    try {
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findUserActiveAndNotActive(
    isActive?: string,
  ): Promise<CounterPersonnel[]> {
    const query = this.counterPersonnelRepository
      .createQueryBuilder('counterPersonnel')
      .leftJoinAndSelect('counterPersonnel.transactionType', 'transactionType');
    if (isActive !== undefined) {
      query.andWhere('counterPersonnel.isActive = :isActive', { isActive });
    }
    try {
      return await query.getMany();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number): Promise<CounterPersonnel> {
    try {
      return await this.counterPersonnelRepository
        .createQueryBuilder('counterPersonnel')
        .leftJoinAndSelect(
          'counterPersonnel.transactionType',
          'transactionType',
        )
        .where('counterPersonnel.id = :id', { id })
        .getOneOrFail();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOneBy(username: string): Promise<CounterPersonnel> {
    try {
      return await this.counterPersonnelRepository.findOneOrFail({
        where: { username },
        relations: ['transactionType'],
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async update(
    id: number,
    updateCounterPersonnelDto: UpdateCounterPersonnelDto,
  ) {
    // Check if the username field is included in the update DTO
    if (updateCounterPersonnelDto.username) {
      // Check if record with the same name already exists, excluding the current record being updated
      const existingRecord = await this.counterPersonnelRepository.findOneBy({
        username: updateCounterPersonnelDto.username,
      });
      if (existingRecord && existingRecord.id !== id) {
        throw new ConflictException('Record already exists');
      }
    }

    // Check if the first name and last name fields are included in the update DTO
    if (
      updateCounterPersonnelDto.firstname &&
      updateCounterPersonnelDto.lastname
    ) {
      // Check if record with the same first name and last name already exists, excluding the current record being updated
      const existingRecord = await this.counterPersonnelRepository.findOneBy({
        firstname: updateCounterPersonnelDto.firstname,
        lastname: updateCounterPersonnelDto.lastname,
      });
      if (existingRecord && existingRecord.id !== id) {
        throw new ConflictException('Record already exists');
      }
    }

    // Hash the new password, if included
    if (updateCounterPersonnelDto.password) {
      const saltOrRounds = await genSalt();
      updateCounterPersonnelDto.password = await hash(
        updateCounterPersonnelDto.password,
        saltOrRounds,
      );
    }

    // Update the record
    try {
      return await this.counterPersonnelRepository.update(
        id,
        updateCounterPersonnelDto,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async delete(id: number) {
    try {
      return await this.counterPersonnelRepository.delete(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
