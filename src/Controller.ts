import {BurnerData, IngredientData, Order} from "./types.js";

export class Controller {
    static instance: Controller = new Controller();

    public difficulty: 'easy'|'medium'|'hard'|'insane' = 'easy';
    public length: number = 3;

    public timeElapsed: number = 0;

    public dishes: IngredientData[][] = [[], [], [], [], [], [], []];
    public dishesReady: boolean[] = [false, false, false, false, false, false, false];

    public burners: BurnerData[] = [
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0},
        {sprite:'blank', ingredient:null, cookTime:0}
    ];


    public orders: Order[] = [];
    generateOrders() {
        const randInt = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1) + min);

        if (this.length < 1)
            this.length = {'easy': 3, 'medium': 6, 'hard': 9, 'insane': 12}[this.difficulty];

        const [min, max] = {'easy': [0,3], 'medium': [2,5], 'hard':[4,7], 'insane':[6,9]}[this.difficulty];

        for (let i = 0; i < this.length; i++) {
            const extras = randInt(min, max);
            const toppings = randInt(Math.max(extras-6, 0), Math.min(extras, 6));
            this.orders.push({
                pasta: this.choose(['penne', 'bowtie', 'macaroni', 'ravioli', 'shell', 'spaghetti'])[0],
                protein: this.choose(['chicken', 'shrimp', 'chorizo', 'meatballs', 'mushrooms', 'salmon'])[0],
                sauce: this.choose(['marinara', 'vodka', 'bolognese', 'pesto', 'alfredo', 'pumpkin'])[0],
                toppings: this.choose(['tomatoes', 'olives', 'anchovies', 'mozzarella', 'basil', 'truffle'], toppings),
                seasonings: this.choose(['parmesan', 'lemon', 'oregano', 'pepper', 'chili', 'garlic'], extras-toppings)
            });
        }
    }
    private choose(arr: any[], n=0) {
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
    select(ingredient: IngredientData | null) {
        if (ingredient === null) {
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