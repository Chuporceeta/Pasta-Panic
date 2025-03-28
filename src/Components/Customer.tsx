import {Context, Devvit, StateSetter} from "@devvit/public-api";
import {Controller} from "../Controller.js";
import {cookIntervals} from "../data.js";

interface CustomerProps {
    index: number,
    ordering: number,
    setOrdering: StateSetter<number>
}

export const Customer = (props: CustomerProps, context: Context): JSX.Element => {
    const activeOrder = Controller.instance.activeOrders[props.index];

    if (!activeOrder) {
        // @ts-ignore
        Controller.instance.setPage('complete');
        return null;
    }

    const [index, ordered] = activeOrder;

    if (index == -1)
        return null;

    const [order, url, fromReddit] = Controller.instance.orders[index];

    function calcEarnings(ingredient: string, cookTime: number | undefined) {
        if (cookTime) {
            // @ts-ignore
            const intervals = cookIntervals[ingredient];
            const val = [2, 4, 1, 0];
            let earnings = 1;
            for (let i = 0; i < 4; i++)
                if (cookTime >= intervals[i])
                    earnings = val[i];
            return earnings;
        }
        return 3;
    }

    return (
        <zstack alignment='end bottom'>
            <image
                url={url}
                imageWidth={380}
                imageHeight={600}
                height='300px'
                width='190px'
                onPress={() => {
                    if (Controller.instance.dishSelection == null)
                        return;
                    let earnings = 0;
                    const sel = Controller.instance.dishes[Controller.instance.dishSelection];
                    const count = (order.pasta ? 1 : 0)
                                        + (order.sauce ? 1 : 0)
                                        + (order.protein ? 1 : 0)
                                        + (order.toppings ? order.toppings.length : 0)
                                        + (order.seasonings ? order.seasonings.length : 0)
                    if (count != sel.length)
                        return;
                    for (const data of sel) {
                        switch(data.type) {
                            case 'pasta':
                                if (!order.pasta || data.ingredient != order.pasta)
                                    return;
                                break;
                            case 'sauce':
                                if (!order.sauce || data.ingredient != order.sauce)
                                    return;
                                break;
                            case 'protein':
                                if (!order.protein || data.ingredient != order.protein)
                                    return;
                                break;
                            case 'topping':
                                if (!order.toppings
                                    || order.toppings.find(ing => data.ingredient == ing) == undefined)
                                    return;
                                break;
                            case 'seasoning':
                                if (!order.seasonings
                                    || order.seasonings.find(ing => data.ingredient == ing) == undefined)
                                    return;
                                break;
                        }
                        earnings += calcEarnings(data.ingredient, data.cookTime);
                    }
                    Controller.instance.earnings += earnings;

                    Controller.instance.dishes[Controller.instance.dishSelection] = [];
                    Controller.instance.dishesReady[Controller.instance.dishSelection] = false;
                    Controller.instance.dishSelection = null;

                    let runComplete = Controller.instance.openOrders.length == 0;
                    for (let i=0; i < Controller.instance.activeOrders.length; i++)
                        if (i != props.index && Controller.instance.activeOrders[i][0] != -1)
                            runComplete = false;
                    console.log(runComplete);
                    if (runComplete) {
                        // @ts-ignore
                        Controller.instance.setPage('complete');
                    }
                    Controller.instance.activeOrders[props.index] = [Controller.instance.openOrders.shift() ?? -1, false];

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
