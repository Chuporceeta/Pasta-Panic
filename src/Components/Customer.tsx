import {Context, Devvit} from "@devvit/public-api";

interface CustomerProps {
    url: string,
}

export const Customer = (props: CustomerProps, context: Context): JSX.Element => {
    return (
        <zstack>
            <image
                url={props.url}
                imageWidth={380}
                imageHeight={600}
            />
        </zstack>
    )
}
