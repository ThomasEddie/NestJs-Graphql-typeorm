import { User } from './../../common/decorator/user.decorator';
import { GQLAuthGuard } from './../auth/gql.guard';
import { ResponseMsg } from './dto/res-msg';
import { UserEntity } from './entities/user.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ComplexityEstimatorArgs,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RESToken } from './dto/res-token.dto';
import { UseGuards, ValidationPipe } from '@nestjs/common';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => RESToken)
  userLogin(
    @Args('createUserInput', new ValidationPipe())
    createUserInput: CreateUserInput,
  ) {
    return this.userService.userLogin(createUserInput);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserEntity], {
    name: 'findAllUser',
    complexity: (options: ComplexityEstimatorArgs) => {
      return options.args.count * options.childComplexity;
    },
  })
  findAll(@User() user: UserEntity) {
    console.log(user);

    return this.userService.findAll();
  }

  @Query(() => UserEntity, { name: 'findOneUser' })
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => ResponseMsg, { name: 'updateUser' })
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => ResponseMsg, { name: 'deleteUser' })
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
