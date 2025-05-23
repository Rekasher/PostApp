import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './modules/categories/entities/category.entity';
import { Users } from './modules/user/entities/user.entity';
import { Posts } from './modules/posts/entities/posts..entity';
import { Comments } from './modules/comments/entities/comments.entity';
import { Roles } from './modules/user/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') || 'localhost',
        port: parseInt(config.get('DOCKER_PORT') ?? '5432', 10),
        username: config.get('DOCKER_USER'),
        password: config.get('DOCKER_PASSWORD'),
        database: config.get('DOCKER_DB'),
        entities: [Users, Categories, Posts, Comments, Roles],
        synchronize: true,
      })
    })
  ],
})
export class AppModule {}
