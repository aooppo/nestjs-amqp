# nestjs-amqp

## Installation

    $ npm install voox-nestjs-amqp amqplib
    $ npm install -D @types/amqplib

## Usage

import { Publish, Consume, Publisher, AfterPublisherInit } from "voox-nestjs-amqp";

```ts
@Injectable()
class OtherService implements AfterPublisherInit {
    @Publish("some_exchange")
    publish: Publisher;

    afterPublisherInit() {
        // do some ....
        this.publish("haha");
    }

    @Consume("some_exchange", "some_queue")
    onMessage(msg: any) {
        console.log(msg); // haha
    }
}
```
