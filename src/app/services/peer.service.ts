import { EventEmitter, Injectable } from '@angular/core';
import { Peer, DataConnection } from 'peerjs';
import { Unit, Warband } from '../data/models';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private _startedInitialization = false;
  private p2p: Peer | null = null;
  public id: string = '';
  public open = new EventEmitter<void>();
  private _connectedPeers: DataConnection[] = [];

  constructor() {}

  /**
   * Initializes the PeerService.
   */
  async initialize(): Promise<void> {
    if (this._startedInitialization) return;
    this._startedInitialization = true;
    // Generate an id of random alphanumeric characters of length 6
    const id = Math.random().toString(36).substring(2, 8);
    this.id = `warstuff-${id}`;
    // Create an instance of peerjs
    this.p2p = new Peer(this.id);
    // Alert the app when the peer connection is open
    this.p2p!.on('open', () => {
      this.open.emit();
    });
  }

  /**
   * Ensures that the PeerService has been initialized before use.
   */
  checkInitialization(): void {
    if (!this._startedInitialization) {
      throw new Error(
        'You must call PeerService.initialize() before using this service!'
      );
    }
  }

  connectToPeer(peerId: string): DataConnection {
    this.checkInitialization();
    const connection = this.p2p!.connect(peerId);
    // When the peer connection is established
    connection.on('open', () => {
      this._connectedPeers.push(connection);
      // When receiving data from the peer
      connection.on('data', (data) => {
        console.log(data);
      });
    });
    return connection;
  }

  sendUnitToPeers(unit: Unit): void {
    this.checkInitialization();
    this._connectedPeers.forEach((peer) => {
      peer.send({
        messageType: 'unit',
        ...unit,
      });
    });
  }

  sendWarbandToPeers(warband: Warband): void {
    this.checkInitialization();
    this._connectedPeers.forEach((peer) => {
      peer.send({
        messageType: 'warband',
        ...warband,
      });
    });
  }
}
