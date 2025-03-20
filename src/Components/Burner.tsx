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
        const sel = Controller.instance.selection;
        if (sel.type == 'pasta')
            data.sprite = 'pot';
        else if (sel.type == 'protein')
            data.sprite = 'pan';
        else
            return;
        // @ts-ignore
        data.ingredient = sel.ingredient;
        Controller.instance.select({type: '', ingredient: ''});
    }

    return (
        <hstack width='134px' height='100px' alignment='center bottom'>
            <zstack onPress={clicked}>
                {sprites[data.sprite]}
                {food}
            </zstack>
        </hstack>
    );
};