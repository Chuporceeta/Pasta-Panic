import {Devvit} from "@devvit/public-api";
import {Controller} from "../Controller.js";
import {cookIntervals} from "../data.js";


interface BurnerProps {
    index: number;
}

export const Burner = (props: BurnerProps): JSX.Element => {
    const data = Controller.instance.burners[props.index];
    const s = Controller.instance.burnerSelection == props.index ? 1 : 0;

    const sprites = {
        blank: <image url='burner.png' imageWidth={95} imageHeight={55}/>,
        pot: <image url={`pot${s}.png`} imageWidth={160} imageHeight={110} width="120px"/>,
        pan: <image url={`pan${s}.png`} imageWidth={191} imageHeight={110} width="130px"/>
    };

    let variant = 'raw'
    if (data.ingredient) {
        const intervals = cookIntervals[data.ingredient];
        if (data.cookTime >= intervals[1])
            variant = 'cooked';
        if (data.cookTime >= intervals[3])
            variant = 'ash';
    }

    const food = data.sprite == 'blank' ? sprites.blank : data.sprite == 'pot' ?
            <image
                url={`CookingIngredients/pasta/${data.ingredient}.png`}
                imageWidth={160}
                imageHeight={110}
                width="120px"
            /> :
            <image
                url={`CookingIngredients/${variant == 'ash' ? 'ash.png' : `${variant}-protein/${data.ingredient}.png`}`}
                imageWidth={191}
                imageHeight={110}
                width="130px"
            />;

    function clicked() {
        const sel = Controller.instance.selection;
        if (data.ingredient == null) { // burner is empty
            if (sel?.type == 'pasta')
                data.sprite = 'pot';
            else if (sel?.type == 'protein')
                data.sprite = 'pan';
            else
                return;
            // @ts-ignore
            data.ingredient = sel.ingredient;
            Controller.instance.select(null);
        } else { // burner has food
            if (Controller.instance.burnerSelection == props.index) // burner is selected -> deselect
                Controller.instance.burnerSelection = null;
            else { // select burner & deselect ingredient
                Controller.instance.burnerSelection = props.index;
                Controller.instance.selection = null;
            }
        }
    }

    return (
        <hstack width='134px' height='100px' alignment='center bottom'>
            <zstack onPress={clicked} alignment='center middle'>
                {sprites[data.sprite]}
                {food}
                {!data.ingredient || data.cookTime < cookIntervals[data.ingredient][3] ? null :
                    <image url={'CookingIngredients/burn.png'} imageWidth={160} imageHeight={110} width="120px"/>
                }
            </zstack>
        </hstack>
    );
};