import {Devvit} from "@devvit/public-api";
import {Pasta, Protein, Sauce, Seasoning, Topping} from "../types.js";
import {Controller} from "../Controller.js";

interface IngredientProps {
    type: 'pasta' | 'protein' | 'sauce' | 'seasoning' | 'topping',
    ingredient: Pasta | Protein | Sauce | Seasoning | Topping,
}

export const Ingredient = (props: IngredientProps): JSX.Element => {
    let alpha = (Controller.instance.selected == props.type+props.ingredient) ? 1 : 0;

    return (
        <zstack
            onPress={() => Controller.instance.select(props.type+props.ingredient)}
            backgroundColor={`rgba(255, 255, 0, ${alpha})`}
            cornerRadius='large'>
        <image
            url={`${props.type}/${props.ingredient}.png`}
            imageWidth={250}
            imageHeight={250}
            width="55px"
            height="55px"
        />
        </zstack>
    );
};