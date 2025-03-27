import {Devvit} from "@devvit/public-api";
import {IngredientData} from "../types.js";
import {Controller} from "../Controller.js";

export const Ingredient = (props: IngredientData): JSX.Element => {
    const alpha = Controller.instance.isSelected(props.ingredient) ? 1 : 0;
    const [w, h] = props.type == 'seasoning' ? [55, 55] : [55, 55]
    return (
        <zstack
            onPress={() => Controller.instance.select(props)}
            backgroundColor={`rgba(255, 255, 0, ${alpha})`}
            cornerRadius='small'
        >
            <image
                url={`Ingredients/${props.type}/${props.ingredient}.png`}
                imageWidth={250}
                imageHeight={250}
                width={`${w}px`}
                height={`${h}px`}
            />
        </zstack>
    );
};