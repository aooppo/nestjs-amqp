import { Options } from "amqplib";
import { AMQP_PUBLISHER_METADATA, AMQP_CONSUMER_METADATA, AMQP_CHANNEL_METADATA } from "./amqp.constants";

export function Publish(
    exchange:
        | string
        | {
            exchange: string;
            type?: string;
            exchangeOptions?: Options.AssertExchange;
            publishOptions?: Options.Publish;
            encode?: Function;
            confirm?: boolean;
        }
) {
    return (target: any, propertyKey: string | symbol) => {
        Reflect.set(target, propertyKey, null);
        const exchangeMetadate = typeof exchange === "string" ? { exchange: exchange } : exchange;
        Reflect.defineMetadata(AMQP_PUBLISHER_METADATA, exchangeMetadate, target, propertyKey);
    };
}

export function Consume(
    exchange:
        | string
        | {
            exchange: string;
            type?: string;
            exchangeOptions?: Options.AssertExchange;
        },
    queue:
        | string
        | {
            queue: string;
            queueOptions?: Options.AssertQueue;
            consumeOptions?: Options.Consume;
            nackOptions?: { allUpTo?: boolean; requeue?: boolean };
            decode?: Function;
        },
    patterns?: string[] | string,
    channel?: {
        prefetch?: number;
    }
) {
    return (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const exchangeMetadate = typeof exchange === "string" ? { exchange: exchange } : exchange;
        const queueMetadate = typeof queue === "string" ? { queue: queue } : queue;
        const patternsMetadate = typeof patterns === "string" ? [patterns] : patterns || [];
        const channelMetadata = channel ? channel : {};
        Reflect.defineMetadata(AMQP_CONSUMER_METADATA, { exchangeMetadate, queueMetadate, patternsMetadate, channelMetadata }, descriptor.value);
    };
}



export function Channel(
    // exchange:
    //     | string
    //     | {
    //         exchange: string;
    //         type?: string;
    //         exchangeOptions?: Options.AssertExchange;
    //         publishOptions?: Options.Publish;
    //         encode?: Function;
    //         confirm?: boolean;
    //     },
    // routingKey?: string[] | string,
    // extraMeta?: any,
) {
    return (target: any, propertyKey: string | symbol) => {
        Reflect.set(target, propertyKey, null);
        // const exchangeMetadate = typeof exchange === "string" ? { exchange: exchange } : exchange;
        Reflect.defineMetadata(AMQP_CHANNEL_METADATA, { /*exchangeMetadate, routingKey, extraMeta*/ }, target, propertyKey);
    };
}