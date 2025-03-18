import {Devvit, useState} from "@devvit/public-api";
import {PastaShelf, ProteinShelf} from "./Shelves.js";
import {Controller} from "../Controller.js";
import {Dish} from "./Dish.js";

interface KitchenScreenProps {
    switcher: JSX.Element,
}

export const KitchenScreen = (props: KitchenScreenProps): JSX.Element => {
    const [enabled, iconOn] = useState(false);

    function sendDish() {
        if (enabled) {
            const i = Controller.instance.getFree();
            if (i) {
                Controller.instance.dishes[i] = Controller.instance.dishes[0];
                Controller.instance.dishes[0] = [];
                iconOn(false);
            }
        }
    }

    return (
        <zstack height="100%" width="100%">
            <image
                url="Backgrounds/Kitchen.png"
                description="kitchen-background"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center' height='100%' width="100%">
                <spacer height='65px'/>
                {PastaShelf}
                <spacer height='15px'/>
                {ProteinShelf}
                <spacer height='25px'/>
                <hstack alignment='center middle' width='100%'>
                    <text>Trash</text>
                    <spacer width='35%'/>
                    <hstack gap='small' alignment='center middle'>
                        {<Dish index={0} iconOn={iconOn}/>}
                        <icon name={enabled ? 'send-fill' : 'send-outline'} size='large' onPress={sendDish}/>
                    </hstack>
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};