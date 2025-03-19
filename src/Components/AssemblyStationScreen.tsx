import {Context, Devvit} from "@devvit/public-api";
import {SauceShelf, SeasoningShelf, ToppingShelf} from "./Shelves.js";
import {Dish} from "./Dish.js";

interface AssemblyScreenProps {
    switcher: JSX.Element,
}

export const AssemblyStationScreen = (props: AssemblyScreenProps, context: Context): JSX.Element => {
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
                <spacer height='35px'/>
                {SauceShelf}
                <spacer height='55px'/>
                <hstack gap='large' alignment='center middle'>
                    <Dish index={1}/>
                    <Dish index={2}/>
                    <Dish index={3}/>
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};