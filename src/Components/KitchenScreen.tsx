import {Devvit} from "@devvit/public-api";
import {PastaShelf, ProteinShelf} from "./Shelves.js";
import {Controller} from "../Controller.js";
import {Dish} from "./Dish.js";
import {Burner} from "./Burner.js";

interface KitchenScreenProps {
    switcher: JSX.Element,
}

export const KitchenScreen = (props: KitchenScreenProps): JSX.Element => {
    const ready = Controller.instance.dishesReady[0];

    function sendDish() {
        if (ready) {
            const i = Controller.instance.getFree('assembly');
            if (i > 0) {
                Controller.instance.dishes[i] = Controller.instance.dishes[0];
                Controller.instance.dishesReady[i] = true;
                Controller.instance.dishes[0] = [];
                Controller.instance.dishesReady[0] = false;
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
                <spacer height='55px'/>
                {PastaShelf}
                <spacer height='25px'/>
                {ProteinShelf}
                <spacer height='30px'/>
                <hstack height='100px' width='100%' alignment='center bottom'>
                    <Burner index={0}/>
                    <Burner index={1}/>
                    <spacer width='10px'/>
                    <Burner index={2}/>
                    <Burner index={3}/>
                </hstack>
                <spacer height='25px'/>
                <hstack alignment='center middle' width='100%'>
                    <image url={'hole.png'} imageWidth={300} imageHeight={150} width='100px' height='50px'/>
                    <spacer width='35%'/>
                    <hstack gap='small' alignment='center middle'>
                        {<Dish index={0}/>}
                        <icon name={ready ? 'send-fill' : 'send-outline'} size='large' onPress={sendDish}/>
                    </hstack>
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};