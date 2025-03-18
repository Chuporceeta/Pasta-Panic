import {Devvit, StateSetter} from "@devvit/public-api";
import {Controller} from "../Controller.js";


interface DishProps {
    index: number,
}

export const Dish = (props: DishProps): JSX.Element => {
    const ingredients = Controller.instance.dishes[props.index];

    function clicked() {
        if (Controller.instance.isSelected(''))
            return;
        const sel = Controller.instance.selection;
        Controller.instance.dishes[props.index].push(sel);
        Controller.instance.dishesReady[0] = true;
        Controller.instance.select({type: '', ingredient: ''});
    }

    return (
        <zstack onPress={clicked} alignment='center middle'>
            <image
                url={`plate.png`}
                imageWidth={300}
                imageHeight={150}
                width="150px"
                height="75px"
            />
            {ingredients.map(({type, ingredient}) => (
                <image
                    url={`Ingredients/${type}/${ingredient}.png`}
                    imageWidth={250}
                    imageHeight={250}
                    width="100px"
                    height="75px"
                />
            ))}
        </zstack>
    );
};