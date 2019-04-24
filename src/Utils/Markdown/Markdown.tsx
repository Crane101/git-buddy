import marked from 'marked';
import React from 'react';

interface Props {
    content: string,
    baseUrl?: string
}

const markdown = (props: Props) => {

    const html = props.content ? marked(props.content, {
        baseUrl: props.baseUrl,
        sanitize: true,
        gfm: true

    }) : null

    return <div dangerouslySetInnerHTML={{ __html: html as string }}></div>

}

export default markdown;