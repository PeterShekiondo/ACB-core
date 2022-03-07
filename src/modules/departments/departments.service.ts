import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(@InjectRepository(Department) private departmentRepository: Repository<Department>) {}

  create(createDepartmentInput: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentInput);

    return this.departmentRepository.save(department);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  findOne(id: number): Promise<Department> {
    return this.departmentRepository.findOneOrFail({id: id});
  }

  update(id: number, updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
    this.departmentRepository.update({id: id}, updateDepartmentInput);

    return this.findOne(id);
  }

  remove(id: number): Promise<Department> {
    const department = this.findOne(id);
    this.departmentRepository.delete({id: id});
    return department;
  }
}
