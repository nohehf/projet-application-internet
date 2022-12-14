import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { Socket } from 'socket.io';

@WebSocketGateway(4242, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): string {
    return 'test';
  }

  connectedSockets = new Map<string, Socket>();

  handleConnection(socket: Socket) {
    this.connectedSockets.set(socket.id, socket);
    // console.dir(socket);
    this.server.emit('connexion', { nClients: this.connectedSockets.size });
  }

  handleDisconnect(socket: Socket) {
    this.connectedSockets.delete(socket.id);
    this.server.emit('connexion', { nClients: this.connectedSockets.size });
  }

  broadcast(event: string, data: any) {
    this.server.emit(event, { data });
  }
}
