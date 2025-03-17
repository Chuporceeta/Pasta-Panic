import {Context, Devvit} from "@devvit/public-api";
import {Pasta, Protein, Sauce, Seasoning, Topping} from "../types.js";

interface IngredientProps {
    type: 'pasta' | 'protein' | 'sauce' | 'seasoning' | 'topping',
    ingredient: Pasta | Protein | Sauce | Seasoning | Topping,
}

export const Ingredient = (props: IngredientProps, context: Context): JSX.Element => {
    return (
        <image
            url={`${props.type}/${props.ingredient}.png`}
            imageWidth={250}
            imageHeight={250}
            width="55px"
            height="55px"
        />
    );
};