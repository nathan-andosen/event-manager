export declare class EventManager {
    private events;
    emit(eventName: string, data?: any): void;
    on(eventName: string, fn: (data?: any) => void, scope?: any): void;
    once(): void;
    off(eventName: string, fn: (data?: any) => void): void;
    offAll(): void;
}
