import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-errors';
import { Hash } from 'src/helper/hash-helper';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { jwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interface/access-token.input';
// import { accessToken } from './interface/access-token.inteface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AccessToken> {
    const user = this.userRepository.findOne({username: authCredentialsDto.username});
    const {username, password} = authCredentialsDto;

    if(!user) {
      throw new AuthenticationError('Invalid Credentials');
    }

    const verifyResult = await Hash.compare(password, (await user).password);

    if(!verifyResult) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload: jwtPayload = {username};
    const accessToken = await this.jwtService.sign(payload);

    return {accessToken};
  }


  create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({id: id});
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    this.userRepository.update({id: id}, updateUserInput);
    return this.findOne(id);
  }

  remove(id: number): Promise<User> {
    const user = this.findOne(id);
    this.userRepository.delete({id: id});
    return user;
  }
}
