import {Context, RedditAPIClient, RedisClient} from "@devvit/public-api";
import {BurnerData, IngredientData, Order} from "./types.js";

export class Controller {
    static instance: Controller;

    readonly redis: RedisClient;
    readonly reddit: RedditAPIClient;

    private readonly currentUser: string;
    private avatarURL?: string;
    public coins: number = 10;

    public difficulty: string = 'easy';
    public myOrder?: Order;

    public dishes: IngredientData[][] = [[], [], [], [], [], [], []];
    public dishesReady: boolean[] = [false, false, false, false, false, false, false];

    public burners: BurnerData[] = [
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0}
    ];

    private constructor(context: Context) {
        this.redis = context.redis;
        this.reddit = context.reddit;
        this.currentUser = context.userId || '';
        console.log('constructor');
        console.log(context.userId);
    }
    static async init(context: Context): Promise<boolean> {
        if (Controller.instance)
            return false;
        Controller.instance = new Controller(context);

        if (this.instance.currentUser) {
            const userData = await this.instance.redis.hMGet(this.instance.currentUser, ['coins', 'order', 'url'])
            if (userData != null) {
                if (userData[0] != undefined)
                    this.instance.coins = parseInt(userData[0]);
                if (userData[1] != undefined)
                    this.instance.myOrder = JSON.parse(userData[1]);
                if (userData[2] != undefined)
                    this.instance.avatarURL = userData[2];
            }
            return true;
        }

        return false;
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
        return this.selection?.ingredient == ingredient;
    }

    getFree(loc: string) {
        if (loc == 'assembly')
            return this.dishes.slice(1, 4).findIndex(dish => dish.length == 0) + 1;
        // if (loc == 'counter')
            return this.dishes.slice(4).findIndex(dish => dish.length == 0) + 4;
    }

    async getAvatarURL() {
        if (!this.avatarURL) {
            this.reddit.getCurrentUsername().then(username => {
                if (username) {
                    this.reddit.getSnoovatarUrl(username).then(url => {
                        if (url)
                            this.avatarURL = url;
                        return url;
                    });
                }
            })
        }
        return this.avatarURL;
    }

    sendOrder(order: Order) {
        this.myOrder = order;
        this.getAvatarURL().then(url => {
            // store user data: id -> {order, coins}
            this.redis.hSet(this.currentUser, {
                order: JSON.stringify(order),
                coins: this.coins.toString(),
                url: url || '',
            });

            // store order: 'orders' -> {avatarURL: order}
            this.redis.hSet('orders', {
                [url || '']: JSON.stringify(order),
            })
        });
    }
}