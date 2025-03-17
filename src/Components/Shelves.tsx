import {Ingredient} from "./Ingredient.js";
import {Devvit} from "@devvit/public-api";

export const PastaShelf: JSX.Element = (
    <hstack gap='large'>
        <Ingredient type='pasta' ingredient='penne'/>
        <Ingredient type='pasta' ingredient='bowtie'/>
        <Ingredient type='pasta' ingredient='macaroni'/>
        <Ingredient type='pasta' ingredient='ravioli'/>
        <Ingredient type='pasta' ingredient='shell'/>
        <Ingredient type='pasta' ingredient='spaghetti'/>
    </hstack>
);

export const ProteinShelf: JSX.Element = (
    <hstack gap='large'>
        <Ingredient type='protein' ingredient='chicken'/>
        <Ingredient type='protein' ingredient='shrimp'/>
        <Ingredient type='protein' ingredient='chorizo'/>
        <Ingredient type='protein' ingredient='meatballs'/>
        <Ingredient type='protein' ingredient='salmon'/>
        <Ingredient type='protein' ingredient='mushrooms'/>
    </hstack>
);

export const SauceShelf: JSX.Element = (
    <hstack gap='large'>
        <Ingredient type='sauce' ingredient='marinara'/>
        <Ingredient type='sauce' ingredient='bolognese'/>
        <Ingredient type='sauce' ingredient='vodka'/>
        <Ingredient type='sauce' ingredient='pesto'/>
        <Ingredient type='sauce' ingredient='alfredo'/>
        <Ingredient type='sauce' ingredient='pumpkin'/>
    </hstack>
);

export const ToppingShelf: JSX.Element = (
    <hstack gap='large'>
        <Ingredient type='topping' ingredient='olives'/>
        <Ingredient type='topping' ingredient='tomatoes'/>
        <Ingredient type='topping' ingredient='mozzarella'/>
        <Ingredient type='topping' ingredient='anchovies'/>
        <Ingredient type='topping' ingredient='basil'/>
        <Ingredient type='topping' ingredient='truffle'/>
    </hstack>
);

export const SeasoningShelf: JSX.Element = (
    <hstack gap='large'>
        <Ingredient type='seasoning' ingredient='parmesan'/>
        <Ingredient type='seasoning' ingredient='pecorino'/>
        <Ingredient type='seasoning' ingredient='oregano'/>
        <Ingredient type='seasoning' ingredient='black-pepper'/>
        <Ingredient type='seasoning' ingredient='red-pepper'/>
        <Ingredient type='seasoning' ingredient='garlic'/>
    </hstack>
);
