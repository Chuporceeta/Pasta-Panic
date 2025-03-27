import {Context, StateSetter} from "@devvit/public-api";
import {BurnerData, IngredientData, Order} from "./types.js";
import {customerSprites} from "../assets/customerSprites.js";

export class Controller {
    static instance: Controller = new Controller();

    public difficulty: 'easy'|'medium'|'hard'|'insane' = 'medium';
    public length: number = 0;
    public timeElapsed: number = 0;
    public earnings: number = 0;

    public dishes: IngredientData[][] = [[], [], [], [], [], [], []];
    public dishesReady: boolean[] = [false, false, false, false, false, false, false];

    public burners: BurnerData[] = [
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0}
    ];

    public setPage?: StateSetter<string>;

    private context?: Context;
    private redditOrders?: Record<string, string>;
    init(context: Context, redditOrders: Record<string, string>) {
        this.context = context;
        this.redditOrders = redditOrders;
    }
    static reset() {
        const context = Controller.instance.context as Context;
        const redditOrders = Controller.instance.redditOrders as Record<string, string>;
        Controller.instance = new Controller();
        Controller.instance.init(context, redditOrders);
    }


    public orders: [Order, string, boolean][] = []; // order, avatarURL, fromReddit
    public openOrders: number[] = [];
    public activeOrders: [number, boolean][] = []; // index, taken
    public ordersVisible: boolean = false;
    generateOrders() {
        const randInt = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1) + min);

        if (this.length < 1)
            this.length = {'easy': 3, 'medium': 6, 'hard': 9, 'insane': 12}[this.difficulty];

        let numRedditOrders = Math.max(0, randInt(-Math.floor(this.length / 3), Math.floor(this.length / 3)));

        const [min, max] = {'easy': [0, 3], 'medium': [2, 5], 'hard': [4, 7], 'insane': [6, 9]}[this.difficulty];

        if (numRedditOrders > 0) {
            if (this.redditOrders) {
                const urls = Object.keys(this.redditOrders);
                numRedditOrders = Math.min(urls.length, numRedditOrders);
                const chosen = this.choose(urls, numRedditOrders);
                for (let url of chosen)
                    this.orders.push([JSON.parse(this.redditOrders[url]), url, true]);
            } else
                numRedditOrders = 0;
        }

        for (let i = 0; i < this.length - numRedditOrders; i++) {
            const extras = randInt(min, max);
            const toppings = randInt(Math.max(extras - 6, 0), Math.min(extras, 6));
            this.orders.push([{
                pasta: this.choose(['penne', 'bowtie', 'macaroni', 'ravioli', 'shell', 'spaghetti'])[0],
                protein: this.choose(['chicken', 'shrimp', 'chorizo', 'meatballs', 'mushrooms', 'salmon'])[0],
                sauce: this.choose(['marinara', 'vodka', 'bolognese', 'pesto', 'alfredo', 'pumpkin'])[0],
                toppings: this.choose(['tomatoes', 'olives', 'anchovies', 'mozzarella', 'basil', 'truffle'], toppings),
                seasonings: this.choose(['parmesan', 'lemon', 'oregano', 'pepper', 'chili', 'garlic'], extras - toppings)
            },
                this.choose(customerSprites)[0], false
            ]);
        }

        // Shuffle orders
        for (let i = this.orders.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.orders[i], this.orders[j]] = [this.orders[j], this.orders[i]];
        }

        this.openOrders = [...Array(this.length).keys()];
        for (let i = 0; i < (this.difficulty == 'easy' ? 1 : this.difficulty == 'medium' ? 2 : 3); i++)
            this.activeOrders.push([this.openOrders.shift() ?? -1, false]);
    }
    private choose(arr: any[], n=1) {
        let result = new Array(n), len = arr.length, taken = new Array(len);
        while (n--) {
            let x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }


    public selection: IngredientData | null = null;
    public burnerSelection: number | null = null;
    public dishSelection: number | null = null;
    select(ingredient: IngredientData | null) {
        if (ingredient === null) {
            if (this.dishSelection != null) {
                this.dishes[this.dishSelection] = [];
                this.dishesReady[this.dishSelection] = false;
                this.dishSelection = null;
            }
            if (this.burnerSelection != null)
                this.burners[this.burnerSelection] = {sprite:'blank', ingredient:null, cookTime:0};
            this.selection = this.burnerSelection = null;
        } else if (this.selection?.ingredient == ingredient.ingredient)
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
}