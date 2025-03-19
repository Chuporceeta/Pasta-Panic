import {Devvit} from "@devvit/public-api";
import {IngredientData} from "../types.js";
import {Controller} from "../Controller.js";

export const Ingredient = (props: IngredientData): JSX.Element => {
    let alpha = Controller.instance.isSelected(props.ingredient) ? 1 : 0;

    return (
        <zstack
            onPress={() => Controller.instance.select(props)}
            backgroundColor={`rgba(255, 255, 0, ${alpha})`}
            borderColor={`rgba(255, 255, 0, ${alpha})`}
            border='thick'
            cornerRadius='small'
        >
            <image
                url={`Ingredients/${props.type}/${props.ingredient}.png`}
                imageWidth={250}
                imageHeight={250}
                width="55px"
                height="55px"
            />
        </zstack>
    );
};