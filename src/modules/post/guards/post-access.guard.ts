import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../../../db/post-entities/post.entity';

@Injectable()
export class PostAccessGuard implements CanActivate {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const post_id = +request.params.id;

    const post = await this.postRepository.findOne({
      where: { id: post_id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('Post not found');

    const isOwner = post.user.id === user.id;
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You have no access to this post.');
    }

    return true;
  }
}
