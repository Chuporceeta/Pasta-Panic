import {Context, Devvit, useState} from "@devvit/public-api";

interface CounterScreenProps {
    switcher: JSX.Element,
}

export const CounterScreen = (props: CounterScreenProps, context: Context): JSX.Element => {
    return (
        <zstack height="100%" width="100%">
            <image
                url="Backgrounds/Counter.png"
                description="counter-background"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center' height='100%' width="100%">
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};