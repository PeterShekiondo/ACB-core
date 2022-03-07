import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsService {
  constructor(@InjectRepository(Position) private positionRepository: Repository<Position>) {}

  create(createPositionInput: CreatePositionInput): Promise<Position> {
    const position = this.positionRepository.create(createPositionInput);

    return this.positionRepository.save(position);
  }

  findAll(): Promise<Position[]> {
    return this.positionRepository.find();
  }

  findOne(id: number): Promise<Position> {
    return this.positionRepository.findOneOrFail({id: id});
  }

  update(id: number, updatePositionInput: UpdatePositionInput): Promise<Position> {
    this.positionRepository.update({id: id}, updatePositionInput);
    return this.findOne(id);
  }

  remove(id: number): Promise<Position> {
    const position = this.findOne(id);
    this.positionRepository.delete({id: id});
    return position;
  }
}
