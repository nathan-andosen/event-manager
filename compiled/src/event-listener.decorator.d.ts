interface IEventListenerArgs {
    eventName: string;
    eventClass?: string;
    initFn?: string;
    destroyFn?: string;
}
export declare function EventListener(eventName: string, classObject?: Object): any;
export declare function EventListener(args: IEventListenerArgs): any;
export {};
