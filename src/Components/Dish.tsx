import {Devvit} from "@devvit/public-api";
import {Controller} from "../Controller.js";


interface DishProps {
    index: number,
}

export const Dish = (props: DishProps): JSX.Element => {
    const ingredients = Controller.instance.dishes[props.index];

    function clicked() {
        const sel = Controller.instance.selection;
        const bSel = Controller.instance.burnerSelection;
        if (bSel != null) { // cooked food selected -> plate, clear burner, deselect, & ready
            const burner = Controller.instance.burners[bSel];
            Controller.instance.dishes[props.index].push({
                type: (burner.sprite == 'pot' ? 'pasta' : 'protein'),
                // @ts-ignore
                ingredient: burner.ingredient,
                cookTime: burner.cookTime,
            });

            Controller.instance.burners[bSel] = {sprite:'blank', ingredient:null, cookTime:0};
            Controller.instance.burnerSelection  = null;
            Controller.instance.dishesReady[props.index] = true;
        }
        if (sel != null) { // ingredient selected -> plate, deselect, & ready
            if (sel.type == 'pasta' || sel.type == 'protein') // can't plate raw food
                return;
            Controller.instance.dishes[props.index].push(sel);
            Controller.instance.select(null);
            Controller.instance.dishesReady[props.index] = true;
        }
        console.log(ingredients);
    }

    if (props.index > 3 && !Controller.instance.dishesReady[props.index])
        return <spacer width='150px' height='75px'/>;

    return (
        <zstack onPress={clicked} alignment='center middle'>
            <image
                url='plate.png'
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