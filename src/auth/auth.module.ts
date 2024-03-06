import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserTask } from 'src/usersTasks/entities/userTask.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService],
  imports:[
    TypeOrmModule.forFeature([UserTask]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService) =>{
        return{
          secret:configService.get('SECRET_KEY'),
          signOptions:{
            expiresIn:'1h'
          }
        }
      }
    })
  ],
  exports:[TypeOrmModule, JwtStrategy,PassportModule, JwtModule]
})
export class AuthModule {}
