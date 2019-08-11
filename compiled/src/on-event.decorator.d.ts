export interface IOnEventArgs {
    eventName: string;
    eventClass?: string;
    initFn?: string;
    destroyFn?: string;
}
export declare function OnEvent(eventName: string, eventClass?: string): any;
export declare function OnEvent(args: IOnEventArgs): any;
