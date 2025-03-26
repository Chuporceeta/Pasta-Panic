import {Context, Devvit} from "@devvit/public-api";
import {Dish} from "./Dish.js";

interface CounterScreenProps {
    switcher: JSX.Element,
    topBar: JSX.Element,
}

export const CounterScreen = (props: CounterScreenProps, context: Context): JSX.Element => {
    return (
        <zstack height="100%" width="100%">
            <image
                url="Backgrounds/CounterBackground.png"
                description="counter-background"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <image
                url="Backgrounds/Counter.png"
                description="counter"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center' height='100%' width="100%">
                {props.topBar}
                <spacer height='245px'/>
                <hstack gap='large' alignment='center middle'>
                    <Dish index={4}/>
                    <Dish index={5}/>
                    <Dish index={6}/>
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};