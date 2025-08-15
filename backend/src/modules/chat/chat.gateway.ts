import { Module } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Emit events to specific rooms/users
  emitToRoom(roomId: string, event: string, data: any) {
    this.server.to(`room_${roomId}`).emit(event, data);
  }

  emitToUser(userId: string, event: string, data: any) {
    this.server.to(`user_${userId}`).emit(event, data);
  }

  emitToProject(projectId: string, event: string, data: any) {
    this.server.to(`project_${projectId}`).emit(event, data);
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  // Handle user joining a chat room
  handleJoinRoom(client: any, roomId: string) {
    client.join(`room_${roomId}`);
    client.emit('joined_room', { roomId });
  }

  // Handle user leaving a chat room
  handleLeaveRoom(client: any, roomId: string) {
    client.leave(`room_${roomId}`);
    client.emit('left_room', { roomId });
  }

  // Handle user joining project room
  handleJoinProject(client: any, projectId: string) {
    client.join(`project_${projectId}`);
    client.emit('joined_project', { projectId });
  }
}
