export interface IEventListenerArgs {
    eventName: string;
    eventClass?: string;
    initFn?: string;
    destroyFn?: string;
}
export declare function EventListener(eventName: string, eventClass?: string): any;
export declare function EventListener(args: IEventListenerArgs): any;
