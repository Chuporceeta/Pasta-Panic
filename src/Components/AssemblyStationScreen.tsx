import {Context, Devvit} from "@devvit/public-api";
import {SauceShelf, SeasoningShelf, ToppingShelf} from "./Shelves.js";

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
                <spacer height='65px'/>
                {SeasoningShelf}
                <spacer height='15px'/>
                {ToppingShelf}
                <spacer height='15px'/>
                {SauceShelf}
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};