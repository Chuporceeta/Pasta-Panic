import { Devvit } from "@devvit/public-api"
import {Controller} from "../Controller.js";

export const OrdersWindow = (): JSX.Element => {
    const visible = Controller.instance.ordersVisible;
    return ( !visible ? null :
        <vstack width='100%' height='100%' alignment='center'>
            <spacer height='10%'/>
            <vstack alignment='center' width='90%' backgroundColor='gray' cornerRadius='medium'>
                <spacer height='20px'/>
                {Controller.instance.activeOrders.map(([i, taken]) => {
                    const order = Controller.instance.orders[i];
                    let main = [];
                    if (order[0].pasta)
                        main.push(`Pasta: ${order[0].pasta}`);
                    if (order[0].protein)
                        main.push(`Protein: ${order[0].protein}`);
                    if (order[0].sauce)
                        main.push(`Sauce: ${order[0].sauce}`);

                    let extras = [];
                    if (order[0].toppings && order[0].toppings.length > 0)
                        extras.push(`Toppings: ${order[0].toppings.join(', ')}`);
                    if (order[0].seasonings && order[0].seasonings.length > 0)
                        extras.push(`Seasonings: ${order[0].seasonings.join(', ')}`);
                    return !taken ? null :
                        [<hstack borderColor='black' cornerRadius='small' width='90%' alignment='middle'>
                            <image
                                url={order[1]}
                                imageWidth={380}
                                imageHeight={600}
                                height='100px'
                                width='64px'
                            />
                            <spacer width='30px'/>
                            <vstack>
                                <hstack gap='large'>
                                    {main.map(str => <text size='large' height='25px'> {str} </text>)}
                                </hstack>
                                {extras.map(str => <text size='large' height='25px'> {str} </text>)}
                            </vstack>
                        </hstack>, <spacer height='20px'/>]
                })}
            </vstack>
        </vstack>
    )
}
