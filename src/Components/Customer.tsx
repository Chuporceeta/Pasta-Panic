import {Devvit, StateSetter} from "@devvit/public-api";
import {Controller} from "../Controller.js";

interface CustomerProps {
    index: number,
    ordering: number,
    setOrdering: StateSetter<number>
}

export const Customer = (props: CustomerProps): JSX.Element => {
    const [index, ordered] = Controller.instance.activeOrders[props.index];

    if (index == -1)
        return null;

    const [order, url, fromReddit] = Controller.instance.orders[index];

    return (
        <zstack alignment='end bottom'>
            <image
                url={url}
                imageWidth={380}
                imageHeight={600}
                height='300px'
                width='190px'
                onPress={() => {

                }}
            />
            { ordered ? null :
                <vstack alignment='center top' height='375px'>
                    <image
                        url={fromReddit ? 'bubbleRed.png' : 'bubble.png'}
                        imageWidth={170}
                        imageHeight={110}
                        width='170px'
                        height='110px'
                        onPress={() => {
                            if (props.ordering == -1) {
                                props.setOrdering(index);
                                Controller.instance.activeOrders[props.index][1] = true;
                            }
                        }}
                    />
                </vstack>
            }
        </zstack>
    )
}
