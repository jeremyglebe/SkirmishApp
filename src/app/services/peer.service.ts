import { EventEmitter, Injectable } from '@angular/core';
import { Peer, DataConnection } from 'peerjs';
import { Unit, Warband } from '../data/models';
import { GuiService } from './gui.service';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private p2p: Peer | null = null;
  public id: string = '';
  public open = new EventEmitter<void>();
  private _connectedPeers: DataConnection[] = [];

  constructor(private gui: GuiService) {
    this.gui.showPromiseLoader(
      this.initialize(),
      'Loading Peer Service Settings...'
    );
  }

  /**
   * Initializes the PeerService.
   */
  async initialize(): Promise<void> {
    // Generate an id of random alphanumeric characters of length 6
    const id = Math.random().toString(36).substring(2, 8);
    this.id = `skirmish-app-${id}`;
    // Create an instance of peerjs
    this.p2p = new Peer(this.id);
    // Alert the app when the peer connection is open
    this.p2p!.on('open', () => {
      this.open.emit();
    });
  }

  async destroy(): Promise<void> {
    this.p2p!.destroy();
    this.p2p = null;
    this.open.unsubscribe();
    this.open = new EventEmitter<void>();
  }

  connectToPeer(peerId: string): DataConnection {
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
    this._connectedPeers.forEach((peer) => {
      peer.send({
        messageType: 'unit',
        ...unit,
      });
    });
  }

  sendWarbandToPeers(warband: Warband): void {
    this._connectedPeers.forEach((peer) => {
      peer.send({
        messageType: 'warband',
        ...warband,
      });
    });
  }
}
