import {Context, Devvit, useState} from "@devvit/public-api";
import {SauceShelf, SeasoningShelf, ToppingShelf} from "./Shelves.js";
import {Dish} from "./Dish.js";

interface AssemblyScreenProps {
    switcher: JSX.Element,
}

export const AssemblyStationScreen = (props: AssemblyScreenProps, context: Context): JSX.Element => {
    const [enabled1, iconOn1] = useState(false);
    const [enabled2, iconOn2] = useState(false);
    const [enabled3, iconOn3] = useState(false);

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
                <spacer height='65px'/>
                {SeasoningShelf}
                <spacer height='15px'/>
                {ToppingShelf}
                <spacer height='15px'/>
                {SauceShelf}
                <spacer height='75px'/>
                <hstack gap='large' alignment='center middle'>
                    <Dish index={1} iconOn={iconOn1}/>
                    <Dish index={2} iconOn={iconOn2}/>
                    <Dish index={3} iconOn={iconOn3}/>
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};