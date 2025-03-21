import {Context, RedditAPIClient, RedisClient} from "@devvit/public-api";
import {BurnerData, IngredientData} from "./types.js";

export class Controller {
    static instance: Controller;

    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;

    public difficulty: string = 'easy';

    public dishes: IngredientData[][] = [[], [], [], [], [], [], []];
    public dishesReady: boolean[] = [false, false, false, false, false, false, false];

    public burners: BurnerData[] = [
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0}
    ];

    private constructor(context: {redis: RedisClient, reddit?: RedditAPIClient}) {
        this.redis = context.redis;
        this.reddit = context.reddit;
    }
    static init(context: Context): Controller {
        if (Controller.instance)
            return Controller.instance;
        Controller.instance = new Controller(context);
        return Controller.instance;
    }

    public selection: IngredientData | null = null;
    public burnerSelection: number | null = null;
    select(ingredient: IngredientData | null) {
        if (ingredient == null || this.selection?.ingredient == ingredient.ingredient)
            this.selection = null;
        else { // select ingredient, deselect potentially selected burner
            this.selection = ingredient;
            this.burnerSelection = null;
        }
    }
    isSelected(ingredient: string) {
        return this.selection?.ingredient == ingredient && this.burnerSelection == null;
    }

    getFree(loc: string) {
        if (loc == 'assembly')
            return this.dishes.slice(1, 4).findIndex(dish => dish.length == 0) + 1;
        // if (loc == 'counter')
            return this.dishes.slice(4).findIndex(dish => dish.length == 0) + 4;
    }
}