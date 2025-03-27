import {Context, Devvit, useState} from "@devvit/public-api";
import {Dish} from "./Dish.js";
import {Customer} from "./Customer.js";
import {Controller} from "../Controller.js";
import {OrdersWindow} from "./OrdersWindow.js";

interface CounterScreenProps {
    switcher: JSX.Element,
    topBar: JSX.Element,
}

export const CounterScreen = (props: CounterScreenProps, context: Context): JSX.Element => {
    const [ordering, setOrdering] = useState<number>(-1);
    let request = [];
    if (ordering != -1) {
        const order = Controller.instance.orders[ordering][0];
        if (order.pasta)
            request.push(`Pasta: ${order.pasta}`);
        if (order.protein)
            request.push(`Protein: ${order.protein}`);
        if (order.sauce)
            request.push(`Sauce: ${order.sauce}`);
        if (order.toppings && order.toppings.length > 0)
            request.push(`Toppings: ${order.toppings.join(', ')}`);
        if (order.seasonings && order.seasonings.length > 0)
            request.push(`Seasonings: ${order.seasonings.join(', ')}`);
    }

    return (
        <zstack height="100%" width="100%" alignment='center bottom'>
            <image
                url="Backgrounds/CounterBackground.png"
                description="counter-background"
                imageHeight={1024}
                imageWidth={1436}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center bottom' height='100%' width='100%'>
                <hstack alignment='center bottom' width='85%'>
                    {[<Customer index={0} ordering={ordering} setOrdering={setOrdering}/>, <spacer grow/>,
                        <Customer index={1} ordering={ordering} setOrdering={setOrdering}/>, <spacer grow/>,
                        <Customer index={2} ordering={ordering} setOrdering={setOrdering}/>].slice(0,
                        Controller.instance.difficulty == 'easy' ? 1 : Controller.instance.difficulty == 'medium' ? 3 : 5)}
                </hstack>
                <spacer height='15%'/>
            </vstack>
            <image
                url="Backgrounds/Counter.png"
                description="counter"
                imageHeight={355}
                imageWidth={1436}
                height='177px'
                width='718px'
            />
            <vstack alignment='center' height='100%' width="100%">
                {props.topBar}
                <spacer height='245px'/>
                <hstack gap='large' alignment='center middle'>
                    <Dish index={4}/>
                    {Controller.instance.difficulty != 'easy' ? <Dish index={5}/> : null}
                    {Controller.instance.difficulty == 'hard' || Controller.instance.difficulty == 'insane'
                        ? <Dish index={6}/> : null}
                </hstack>
                <spacer grow/>
                {props.switcher}
            </vstack>
            <vstack width='100%' height='100%' alignment='center'>
                <spacer height='15%'/>
            {ordering == -1 ? null :
                <vstack cornerRadius='medium' backgroundColor='gray' alignment='center middle' width='475px'>
                    <spacer height='30px'/>
                    <text style='heading' size='xxlarge'> I want to order: </text>
                    <spacer height='15px'/>
                    {request.map(str => <text size='large' height='25px'> {str} </text>)}
                    <spacer height='20px'/>
                    <button onPress={() => {setOrdering(-1)}}> Ok </button>
                    <spacer height='30px'/>
                </vstack>
            }
            </vstack>
            <OrdersWindow/>
        </zstack>
    );
};