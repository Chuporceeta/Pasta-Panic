import {Devvit} from "@devvit/public-api";
import {IngredientData} from "../types.js";
import {Controller} from "../Controller.js";

export const Ingredient = (props: IngredientData): JSX.Element => {
    const alpha = Controller.instance.isSelected(props.ingredient) ? 1 : 0;
    const [w, h] = props.type == 'seasoning' ? [55, 55] : [55, 55]
    // const tray = props.type == 'protein' || props.type == 'topping' ?
    //     <image
    //         url='tray.png'
    //         imageWidth={250}
    //         imageHeight={250}
    //         width='55px'
    //         height='55px'
    //     /> : <spacer/>
    return (
        <zstack
            onPress={() => Controller.instance.select(props)}
            backgroundColor={`rgba(255, 255, 0, ${alpha})`}
            borderColor={`rgba(255, 255, 0, ${alpha})`}
            border='thick'
            cornerRadius='small'
        >
            {/*{tray}*/}
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