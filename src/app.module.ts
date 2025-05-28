import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './db/category-entities/category.entity';
import { Users } from './db/user-entities/user.entity';
import { Posts } from './db/post-entities/post.entity';
import { Comments } from './db/comment-entities/comment.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') || 'localhost',
        port: parseInt(config.get('DATA_BASE_PORT') ?? '5432', 10),
        username: config.get('DATA_BASE_USER'),
        password: config.get('DATA_BASE_PASSWORD'),
        database: config.get('DATA_BASE_NAME'),
        entities: [Users, Categories, Posts, Comments],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
