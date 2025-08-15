import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatRoom, ChatMessage } from '../../entities';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

// WebSocket Gateway for real-time chat

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, ChatMessage])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService, ChatGateway],
})
export class ChatModule {}
