import { EventEmitter, Injectable } from '@angular/core';
import { Peer, DataConnection } from 'peerjs';
import { Unit, Warband } from '../data/models';
import { GuiService } from './gui.service';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private p2p: Peer | null = null;
  private _selfPeerId: string = '';
  private _connections: DataConnection[] = [];

  public open = new EventEmitter<void>();

  constructor(private gui: GuiService) {
    this.gui.showPromiseLoader(
      this.initialize(),
      'Loading Peer Service Settings...'
    );
  }

  get id(): string {
    return p2pCutIdString(this._selfPeerId);
  }

  get connections(): string[] {
    return this._connections.map((connection) => connection.peer);
  }

  /**
   * Initializes the PeerService.
   */
  async initialize(): Promise<void> {
    this._selfPeerId = p2pGetFullIdString(p2pGenerateId());
    // Create an instance of peerjs
    this.p2p = new Peer(this._selfPeerId);
    // Alert the app when the peer connection is open
    this.p2p!.on('open', this.onSelfOpen.bind(this));
  }

  async destroy(): Promise<void> {
    this.p2p!.destroy();
    this.p2p = null;
    this.open.unsubscribe();
    this.open = new EventEmitter<void>();
  }

  connectTo(peerId: string): DataConnection {
    // Handle cut and full id strings by cutting just in case
    // and then expanding the full id string
    peerId = p2pGetFullIdString(p2pCutIdString(peerId));
    // Connect to the peer with the given id
    const connection = this.p2p!.connect(peerId);
    // When the peer connection is established
    connection.on('open', this.onPeerOpen.bind(this, connection));
    return connection;
  }

  onSelfOpen(): void {
    this.open.emit();
    this.p2p!.on('connection', this.onSelfReceivedConnection.bind(this));
  }

  onSelfReceivedConnection(connection: DataConnection): void {
    connection.on('open', this.onPeerOpen.bind(this, connection));
  }

  onPeerOpen(connection: DataConnection): void {
    console.log(`onPeerOpen: Opened connection with ${connection.peer}`);
    this._connections.push(connection);
    connection.on('data', this.onPeerReceivedData.bind(this));
  }

  onPeerReceivedData(data: any): void {
    console.log('onPeerReceivedData', data);
  }

  sendUnit(unit: Unit): void {
    this._connections.forEach((peer) => {
      peer.send({
        messageType: 'unit',
        ...unit,
      });
    });
  }

  sendWarband(warband: Warband): void {
    this._connections.forEach((peer) => {
      peer.send({
        messageType: 'warband',
        ...warband,
      });
    });
  }
}

export function p2pGenerateId(): string {
  // Generate an id of random alphanumeric characters of length 6
  return Math.random().toString(36).substring(2, 8);
}

export function p2pGetFullIdString(id: string): string {
  return `skirmish-app-${id}`;
}

export function p2pCutIdString(id: string): string {
  return id.replace('skirmish-app-', '');
}
