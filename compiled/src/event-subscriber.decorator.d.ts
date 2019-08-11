export interface IEventSubscriberOptions {
    eventName: string;
    eventClass?: string;
    initFn?: string;
    destroyFn?: string;
}
declare type IOptions = IEventSubscriberOptions;
export declare function EventSubscriber(eventName: string, eventClass?: string): any;
export declare function EventSubscriber(options: IOptions): any;
export {};
