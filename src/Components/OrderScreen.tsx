import {Context, Devvit, StateSetter, useForm, useState} from "@devvit/public-api";
import {IngredientData, Order, Pasta, Protein, Sauce, Seasoning, Topping} from "../types.js";

interface OrderScreenProps {
    coins: number,
    myOrder: Order | null,
    avatarURL: string,
    setPage: StateSetter<string>
}

export const OrderScreen = (props: OrderScreenProps, context: Context): JSX.Element => {
    const [order, setOrder] = useState<Order|null>(props.myOrder);

    const orderForm = useForm(
        {
            title: 'Order Food',
            acceptLabel: 'Order',
            fields: [
                {
                    type: 'select',
                    name: 'pasta',
                    label: 'Pasta',
                    required: false,
                    multiSelect: false,
                    options: [
                        {label: 'Penne', value: 'penne'},
                        {label: 'Farfalle', value: 'bowtie'},
                        {label: 'Macaroni', value: 'macaroni'},
                        {label: 'Ravioli', value: 'ravioli'},
                        {label: 'Shell', value: 'shell'},
                        {label: 'Spaghetti', value: 'spaghetti'},
                    ]
                },
                {
                    type: 'select',
                    name: 'sauce',
                    label: 'Sauce',
                    required: false,
                    multiSelect: false,
                    options: [
                        {label: 'Marinara', value: 'marinara'},
                        {label: 'Bolognese', value: 'bolognese'},
                        {label: 'Vodka', value: 'vodka'},
                        {label: 'Pesto', value: 'pesto'},
                        {label: 'Alfredo', value: 'alfredo'},
                        {label: 'Pumpkin', value: 'pumpkin'},
                    ]
                },
                {
                    type: 'select',
                    name: 'protein',
                    label: 'Protein',
                    required: false,
                    multiSelect: false,
                    options: [
                        {label: 'Chicken', value: 'chicken'},
                        {label: 'Shrimp', value: 'shrimp'},
                        {label: 'Chorizo', value: 'chorizo'},
                        {label: 'Meatballs', value: 'meatballs'},
                        {label: 'Mushrooms', value: 'mushrooms'},
                        {label: 'Salmon', value: 'salmon'},
                    ]
                },
                {
                    type: 'select',
                    name: 'toppings',
                    label: 'Toppings',
                    required: false,
                    multiSelect: true,
                    options: [
                        {label: 'Tomatoes', value: 'tomatoes'},
                        {label: 'Olives', value: 'olives'},
                        {label: 'Anchovies', value: 'anchovies'},
                        {label: 'Mozzarella', value: 'mozzarella'},
                        {label: 'Basil', value: 'basil'},
                        {label: 'Truffle', value: 'truffle'},
                    ]
                },
                {
                    type: 'select',
                    name: 'seasonings',
                    label: 'Seasonings',
                    required: false,
                    multiSelect: true,
                    options: [
                        {label: 'Parmesan', value: 'parmesan'},
                        {label: 'Lemon Zest', value: 'lemon'},
                        {label: 'Oregano', value: 'oregano'},
                        {label: 'Black Pepper', value: 'pepper'},
                        {label: 'Chili Flakes', value: 'chili'},
                        {label: 'Garlic Powder', value: 'garlic'},
                    ]
                },
            ],
        },
        async (values) => {
            const newOrder = {
                pasta: (values.pasta != undefined) ? values.pasta[0] as Pasta : null,
                protein: (values.protein != undefined) ? values.protein[0] as Protein : null,
                sauce: (values.sauce != undefined) ? values.sauce[0] as Sauce : null,
                toppings: values.toppings as Topping[],
                seasonings: values.seasonings as Seasoning[]
            };
            setOrder(newOrder);

            // store user data: id -> {order, coins}
            await context.redis.hSet(context.userId || '', {
                coins: props.coins.toString(),
                order: JSON.stringify(newOrder),
                url: props.avatarURL,
            });

            // store order: 'orders' -> {avatarURL: order}
            await context.redis.hSet('orders', {
                [props.avatarURL]: JSON.stringify(newOrder),
            });
        }
    );

    let ingredients: IngredientData[] = [];
    if (order != null) {
        if (order.pasta != null)
            ingredients.push({type: 'pasta', ingredient: order.pasta});
        if (order.sauce != null)
            ingredients.push({type: 'sauce', ingredient: order.sauce});
        if (order.toppings != null)
            for (let topping of order.toppings)
                ingredients.push({type: 'topping', ingredient: topping});
        if (order.protein != null)
            ingredients.push({type: 'protein', ingredient: order.protein});
        if (order.seasonings != null)
            for (let seasoning of order.seasonings)
                ingredients.push({type: 'seasoning', ingredient: seasoning});
    }

    return (
        <zstack width='100%' height='100%' backgroundColor='gray'>
            <zstack height='85%' alignment='bottom'>
                <image
                    url='https://i.redd.it/snoovatar/avatars/65436089-2a0c-4032-aae4-115939c92501.png'
                    imageWidth={380}
                    imageHeight={494}
                    height='350px'
                    width='290px'
                />
            </zstack>
            <image
                url="Backgrounds/OrderCounter.png"
                description="order-counter"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center' width='100%' height='100%'>
                <spacer height='25px'/>
                <text>You have {props.coins} coins</text>
                <spacer height='150px'/>
                {order == undefined ?
                    <vstack height='75px'>
                        <text>You don't have an active order</text>
                        <spacer grow/>
                        <button onPress={() => context.ui.showForm(orderForm)}>Order Food</button>
                    </vstack> :
                    <vstack height='75px'>
                        <text>You have an active order</text>
                    </vstack>
                }
                <spacer height='35px'/>
                <zstack alignment='center middle'>
                    <image
                        url='plate.png'
                        imageWidth={300}
                        imageHeight={150}
                        width="150px"
                        height="75px"
                    />
                    {ingredients.map(({type, ingredient}) => (
                        <image
                            url={`PlatedIngredients/${type}/${ingredient}.png`}
                            imageWidth={300}
                            imageHeight={150}
                            width="150px"
                            height="75px"
                        />
                    ))}
                </zstack>
            </vstack>
            <zstack width='80px' height='75px' alignment='end middle'>
                <button height='30px' onPress={() => {
                    props.setPage('menu');
                }}> Back </button>
            </zstack>
        </zstack>
    );
};
//