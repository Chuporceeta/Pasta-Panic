import {Context, Devvit} from "@devvit/public-api";

interface KitchenScreenProps {
    switcher: JSX.Element,
}

export const KitchenScreen = (props: KitchenScreenProps, context: Context): JSX.Element => {
    return (
        <vstack alignment='center' height='100%' backgroundColor='gray'>
            <text>Kitchen</text>
            <spacer grow/>
            {props.switcher}
        </vstack>
    );
};