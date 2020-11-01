/// <reference types="node" />
import WebSocket from "ws";
import { Manager } from "./Manager";
import { Player, Track, UnresolvedTrack } from "./Player";
import { PlayerEvent, PlayerEvents, TrackEndEvent, TrackExceptionEvent, TrackStartEvent, TrackStuckEvent, WebSocketClosedEvent } from "./Utils";
export declare class Node {
    manager: Manager;
    options: NodeOptions;
    /** The socket for the node. */
    socket: WebSocket | null;
    /** The amount of rest calls the node has made. */
    calls: number;
    /** The stats for the node. */
    stats: NodeStats;
    private reconnectTimeout?;
    private reconnectAttempts;
    /** Returns if connected to the Node. */
    get connected(): boolean;
    /**
     * Creates an instance of Node.
     * @param manager
     * @param options
     */
    constructor(manager: Manager, options: NodeOptions);
    /** Connects to the Node. */
    connect(): void;
    /** Destroys the Node. */
    destroy(): void;
    /**
     * Sends data to the Node.
     * @param data
     */
    send(data: unknown): Promise<boolean>;
    private reconnect;
    protected open(): void;
    protected close(code: number, reason: string): void;
    protected error(error: Error): void;
    protected message(d: Buffer | string): void;
    protected handleEvent(payload: PlayerEvent & PlayerEvents): void;
    protected trackStart(player: Player, track: Track, payload: TrackStartEvent): void;
    protected trackEnd(player: Player, track: Track, payload: TrackEndEvent): void;
    protected trackStuck(player: Player, track: Track, payload: TrackStuckEvent): void;
    protected trackError(player: Player, track: Track | UnresolvedTrack, payload: TrackExceptionEvent): void;
    protected socketClosed(player: Player, payload: WebSocketClosedEvent): void;
}
export interface NodeOptions {
    /** The host for the node. */
    host: string;
    /** The port for the node. */
    port?: number;
    /** The password for the node. */
    password?: string;
    /** Whether the host uses SSL. */
    secure?: boolean;
    /** The identifier for the node. */
    identifier?: string;
    /** The retryAmount for the node. */
    retryAmount?: number;
    /** The retryDelay for the node. */
    retryDelay?: number;
}
export interface NodeStats {
    /** The amount of players on the node. */
    players: number;
    /** The amount of playing players on the node. */
    playingPlayers: number;
    /** The uptime for the node. */
    uptime: number;
    /** The memory stats for the node. */
    memory: MemoryStats;
    /** The cpu stats for the node. */
    cpu: CPUStats;
    /** The frame stats for the node. */
    frameStats: FrameStats;
}
export interface MemoryStats {
    /** The free memory of the allocated amount. */
    free: number;
    /** The used memory of the allocated amount. */
    used: number;
    /** The total allocated memory. */
    allocated: number;
    /** The reservable memory. */
    reservable: number;
}
export interface CPUStats {
    /** The core amount the host machine has. */
    cores: number;
    /** The system load. */
    systemLoad: number;
    /** The lavalink load. */
    lavalinkLoad: number;
}
export interface FrameStats {
    /** The amount of sent frames. */
    sent?: number;
    /** The amount of nulled frames. */
    nulled?: number;
    /** The amount of deficit frames. */
    deficit?: number;
}
