import {Context, RedditAPIClient, RedisClient, useState} from "@devvit/public-api";

export class Controller {
    static instance: Controller;

    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;

    public selected: string;

    private constructor(context: {redis: RedisClient, reddit?: RedditAPIClient}) {
        this.redis = context.redis;
        this.reddit = context.reddit;
        this.selected = '';
    }

    static init(context: Context): Controller {
        if (Controller.instance)
            return Controller.instance;
        Controller.instance = new Controller(context);
        return Controller.instance;
    }

    select(selection: string) {
        this.selected = selection;
    }

}