declare type ICallbackFn = (data?: any, next?: INextFn) => void;
export declare type INextFn = () => {
    completed: (cb: () => void) => void;
};
export declare class EventManager {
    private events;
    emit(eventName: string, data?: any): void;
    on(eventName: string, fn: ICallbackFn, scope?: any): void;
    once(eventName: string, fn: ICallbackFn, scope?: any): void;
    private addFn;
    off(eventName: string, fn: (data?: any, next?: INextFn) => void): void;
    offAll(eventName?: string): boolean;
}
export {};
