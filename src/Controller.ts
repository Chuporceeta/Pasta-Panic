import {Context, RedditAPIClient, RedisClient} from "@devvit/public-api";
import {IngredientData} from "./types.js";

export class Controller {
    static instance: Controller;

    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;

    public dishes: IngredientData[][];

    private constructor(context: {redis: RedisClient, reddit?: RedditAPIClient}) {
        this.redis = context.redis;
        this.reddit = context.reddit;
        this.selection = {type: '', ingredient: ''};
        this.dishes = [[], [], [], []];
        this.free = [1, 2, 3];
    }

    static init(context: Context): Controller {
        if (Controller.instance)
            return Controller.instance;
        Controller.instance = new Controller(context);
        return Controller.instance;
    }

    public selection: IngredientData;
    select(ingredient: IngredientData) {
        this.selection = ingredient;
    }
    isSelected(ingredient: string) {
        return this.selection.ingredient == ingredient;
    }

    private free: number[];
    getFree() {
        return this.free.shift();
    }
}