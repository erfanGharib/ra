import { WebSocket, WebSocketServer } from "ws";
import http from 'http';

const clients = new Set<WebSocket>();
const setupEvents = (ws: WebSocket) => {
    ws.on('message', function message(data) {
        const _data = data.toString();

        console.log(_data);
        

        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(_data);
            }
        }
    });
    ws.on('error', console.error);
}

export const initSocket = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    const wsServer = new WebSocketServer({ server });
    
    wsServer.on("error", (err) => {
        console.error(err);
    });
    
    wsServer.on("close", () => {
        console.log("websocket connection closed.");
    });
    
    wsServer.on('connection', function connection(ws) {
        console.log("new client connected");
        clients.add(ws);
        setupEvents(ws)
    });
}