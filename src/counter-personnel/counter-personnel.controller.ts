import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CounterPersonnelService } from './counter-personnel.service';
import { CreateCounterPersonnelDto } from './dto/create-counter-personnel.dto';
import { UpdateCounterPersonnelDto } from './dto/update-counter-personnel.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { EventsGateWay } from 'src/events/events.gateway';

@Controller('counter-personnel')
export class CounterPersonnelController {
  constructor(
    private readonly counterPersonnelService: CounterPersonnelService,
    private readonly eventsGateWay: EventsGateWay
    ) {}

  @Post()
  @Public()
  async create(@Body() createCounterPersonnelDto: CreateCounterPersonnelDto) {
    const newCounterPersonnel = await this.counterPersonnelService.create(createCounterPersonnelDto);
    this.eventsGateWay.server.emit('createCounterPersonnelCreated', newCounterPersonnel);
      return newCounterPersonnel;
  }

  @Get()
  @Public()
  async findAll() {
    return await this.counterPersonnelService.findAll();
  }

  @Get('/user')
  @Public()
  async findUserActiveAndNotActive(
    @Query('isActive') isActive?: string,
  ) {
    return await this.counterPersonnelService.findUserActiveAndNotActive(isActive);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.counterPersonnelService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  async update(@Param('id') id: string, @Body() updateCounterPersonnelDto: UpdateCounterPersonnelDto) {
    const updatedcounterPersonnel = await this.counterPersonnelService.update(+id, updateCounterPersonnelDto);
    this.eventsGateWay.server.emit('counterPersonnelUpdated', updatedcounterPersonnel);
      return updatedcounterPersonnel;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedcounterPersonnel = await this.counterPersonnelService.delete(+id);
    this.eventsGateWay.server.emit('counterPersonnelDeleted', deletedcounterPersonnel);
      return deletedcounterPersonnel;
  }
}
