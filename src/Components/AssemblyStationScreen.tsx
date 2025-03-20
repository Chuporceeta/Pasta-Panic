import {Context, Devvit} from "@devvit/public-api";
import {SauceShelf, SeasoningShelf, ToppingShelf} from "./Shelves.js";
import {Dish} from "./Dish.js";
import {Controller} from "../Controller.js";

interface AssemblyScreenProps {
    switcher: JSX.Element,
}

export const AssemblyStationScreen = (props: AssemblyScreenProps, context: Context): JSX.Element => {
    const [ready1, ready2, ready3] = Controller.instance.dishesReady.slice(1, 4);
    function send(index: number) {
        const i = Controller.instance.getFree('counter');
        if (i > 3) {
            Controller.instance.dishes[i] = Controller.instance.dishes[index];
            Controller.instance.dishesReady[i] = true;

            Controller.instance.dishes[index] = [];
            Controller.instance.dishesReady[index] = false;
        }
    }

    return (
        <zstack height='100%' width='100%'>
            <image
                url="Backgrounds/AssemblyStation.png"
                description="assembly-background"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center' height='100%' width='100%'>
                <spacer height='55px'/>
                {SeasoningShelf}
                <spacer height='25px'/>
                {ToppingShelf}
                <spacer height='25px'/>
                {SauceShelf}
                <spacer height='55px'/>
                <hstack gap='large' alignment='center middle'>
                    <vstack gap='small' alignment='center'>
                        <Dish index={1}/>
                        <button size='small' disabled={!ready1} onPress={()=>send(1)}>Done</button>
                    </vstack>
                    <vstack gap='small' alignment='center'>
                        <Dish index={2}/>
                        <button size='small' disabled={!ready2} onPress={()=>send(2)}>Done</button>
                    </vstack>
                    <vstack gap='small' alignment='center'>
                        <Dish index={3}/>
                        <button size='small' disabled={!ready3} onPress={()=>send(3)}>Done</button>
                    </vstack>
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};