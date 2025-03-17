import {Context, Devvit} from "@devvit/public-api";

interface CounterScreenProps {
    switcher: JSX.Element,
}

export const CounterScreen = (props: CounterScreenProps, context: Context): JSX.Element => {
    return (
        <vstack alignment='center' height='100%' backgroundColor='gray'>
            <text>Counter</text>
            <spacer grow/>
            {props.switcher}
        </vstack>
    );
};