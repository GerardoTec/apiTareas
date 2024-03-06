import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskService } from './task.service';
import { Tasks } from './entities/task.entity';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports:[TypeOrmModule.forFeature([Tasks]),AuthModule]
})
export class TaskModule {}