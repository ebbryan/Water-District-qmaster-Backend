import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class EventsGateWay {
    @WebSocketServer()
    server: Server;
}