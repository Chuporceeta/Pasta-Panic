import {Context, RedditAPIClient, RedisClient, useForm} from "@devvit/public-api";
import {IngredientData} from "./types.js";

export class Controller {
    static instance: Controller;

    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;

    public dishes: IngredientData[][] = [[], [], [], []];
    public dishesReady: boolean[] = [false, false, false, false];

    private constructor(context: {redis: RedisClient, reddit?: RedditAPIClient}) {
        this.redis = context.redis;
        this.reddit = context.reddit;
        this.free = [1, 2, 3];
    }

    static init(context: Context): Controller {
        if (Controller.instance)
            return Controller.instance;
        Controller.instance = new Controller(context);
        return Controller.instance;
    }

    public difficulty: string = 'easy';


    public selection: IngredientData = {type: '', ingredient: ''};
    select(ingredient: IngredientData) {
        if (this.selection.ingredient == ingredient.ingredient) {
            this.selection = {type: '', ingredient: ''};
            console.log('deselect');
        } else
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