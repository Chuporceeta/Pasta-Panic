import {Devvit} from "@devvit/public-api";
import {PastaShelf, ProteinShelf} from "./Shelves.js";

interface KitchenScreenProps {
    switcher: JSX.Element,
}

export const KitchenScreen = (props: KitchenScreenProps): JSX.Element => {
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
                <spacer height='65px'/>
                {PastaShelf}
                <spacer height='15px'/>
                {ProteinShelf}
                <spacer grow/>
                {props.switcher}
            </vstack>
        </zstack>
    );
};