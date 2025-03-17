import {Context, Devvit} from "@devvit/public-api";

interface AssemblyScreenProps {
    switcher: JSX.Element,
}

export const AssemblyStationScreen = (props: AssemblyScreenProps, context: Context): JSX.Element => {
    return (
        <vstack alignment='center' height='100%' backgroundColor='gray'>
            <text>Assembly Station</text>
            <spacer grow/>
            {props.switcher}
        </vstack>
    );
};