export type Pasta = 'penne' | 'bowtie' | 'macaroni' | 'ravioli' | 'shell' | 'spaghetti';
export type Protein = 'chicken' | 'shrimp' | 'chorizo' | 'meatballs' | 'mushrooms' | 'salmon';
export type Topping = 'tomatoes' | 'olives' | 'anchovies' | 'mozzarella' | 'basil' | 'truffle';
export type Seasoning = 'parmesan' | 'lemon' | 'oregano' | 'pepper' | 'chili' | 'garlic';
export type Sauce = 'marinara' | 'vodka' | 'bolognese' | 'pesto' | 'alfredo' | 'pumpkin';

export type IngredientData = {
    type: 'pasta' | 'protein' | 'sauce' | 'seasoning' | 'topping' | '',
    ingredient: Pasta | Protein | Sauce | Seasoning | Topping | '',
    cookTime?: number
}

export type BurnerData = {
    sprite: 'blank' | 'pot' | 'pan',
    ingredient: Pasta | Protein | null,
    cookTime: number,
}

export type Order = {
    pasta: Pasta | null,
    sauce: Sauce | null,
    protein: Protein | null,
    toppings: Topping[],
    seasonings: Seasoning[],
}