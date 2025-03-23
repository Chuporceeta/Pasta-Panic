import {Context, Devvit, useForm} from "@devvit/public-api";
import {Controller} from "../Controller.js";
import {IngredientData, Pasta, Protein, Sauce, Seasoning, Topping} from "../types.js";

export const OrderScreen = (props: any, context: Context): JSX.Element => {
    const order = Controller.instance.myOrder;
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
            console.log('sent');
            Controller.instance.sendOrder({
                pasta: (values.pasta != undefined) ? values.pasta[0] as Pasta : null,
                protein: (values.protein != undefined) ? values.protein[0] as Protein : null,
                sauce: (values.sauce != undefined) ? values.sauce[0] as Sauce : null,
                toppings: values.toppings as Topping[],
                seasonings: values.seasonings as Seasoning[]
            });

        }
    );

    let ingredients: IngredientData[] = [];
    if (order != undefined) {
        if (order.pasta != null)
            ingredients.push({type: 'pasta', ingredient: order.pasta});
        if (order.sauce != null)
            ingredients.push({type: 'sauce', ingredient: order.sauce});
        if (order.protein != null)
            ingredients.push({type: 'protein', ingredient: order.protein});
        if (order.toppings != null)
            for (let topping of order.toppings)
                ingredients.push({type: 'topping', ingredient: topping});
        if (order.seasonings != null)
            for (let seasoning of order.seasonings)
                ingredients.push({type: 'seasoning', ingredient: seasoning});
    }

    return (
        <zstack width='100%' height='100%' backgroundColor='gray'>
            <image
                url="Backgrounds/Counter.png"
                description="counter"
                imageHeight={512}
                imageWidth={718}
                height="100%"
                width="100%"
                resizeMode="cover"
            />
            <vstack alignment='center' width='100%' height='100%'>
                <spacer height='25px'/>
                <text>You have `{Controller.instance.coins}` coins</text>
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
                            url={`Ingredients/${type}/${ingredient}.png`}
                            imageWidth={250}
                            imageHeight={250}
                            width="100px"
                            height="75px"
                        />
                    ))}
                </zstack>
            </vstack>
        </zstack>
    );
};