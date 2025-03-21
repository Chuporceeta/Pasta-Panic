import {Devvit} from "@devvit/public-api";
import {Controller} from "../Controller.js";


interface BurnerProps {
    index: number;
}

const sprites = {
    blank: <image url='burner.png' imageWidth={95} imageHeight={55}/>,
    pot: <image url='pot.png' imageWidth={150} imageHeight={110} width="120px"/>,
    pan: <image url='pan.png' imageWidth={181} imageHeight={110} width="130px"/>
};

export const Burner = (props: BurnerProps): JSX.Element => {
    const data = Controller.instance.burners[props.index];
    const alpha = Controller.instance.burnerSelection == props.index ? 1 : 0;

    const food = data.sprite == 'blank' ? sprites.blank : data.sprite == 'pot' ?
            <image
                url={`Ingredients/pasta/${data.ingredient}.png`}
                imageWidth={250}
                imageHeight={250}
                width="100px"
                height="75px"
            /> :
            <image
                url={`Ingredients/protein/${data.ingredient}.png`}
                imageWidth={250}
                imageHeight={250}
                width="100px"
                height="75px"
            />;

    function clicked() {
        console.log(Controller.instance.burnerSelection, Controller.instance.selection);
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
            else // select burner
                Controller.instance.burnerSelection = props.index;
        }
    }

    return (
        <hstack width='134px' height='100px' alignment='center bottom'>
            <zstack onPress={clicked} backgroundColor={`rgba(255, 255, 0, ${alpha})`}>
                {sprites[data.sprite]}
                {food}
            </zstack>
        </hstack>
    );
};