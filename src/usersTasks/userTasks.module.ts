import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserTaskController } from './userTask.controller';
import { UserTaskService } from './userTasks.service';
import { UserTask } from './entities/userTask.entity';

@Module({
  controllers: [UserTaskController],
  providers: [UserTaskService],
  imports:[TypeOrmModule.forFeature([UserTask]),AuthModule]
})
export class UserTaskModule {}
