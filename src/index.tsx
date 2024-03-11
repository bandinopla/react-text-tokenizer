import React, { useMemo } from 'react';

export type TokenEater = {
    match: RegExp,
    getReactNode: (m:RegExpMatchArray, key:any)=>React.ReactNode
} 


export const TextTokenizer:React.FC<{ text:string, tokenEaters:TokenEater[] }> = ({ text, tokenEaters }) => {
 
    const tokenizedText:React.ReactNode[] = useMemo(()=>{

        const nodes : React.ReactNode[] = [];

        let cursor = 0;
        let lastNodeIsText = false;
        let textBlocks:string[] = []

        const eat = ( eater:TokenEater ) : boolean => {

            const result = text.substring(cursor).match( eater.match );
    
            if( result !=null )
            {
                cursor += result[0]?.length!;
    
                nodes.push( eater.getReactNode( result, nodes.length ) );
                lastNodeIsText = false;
                return true;
            }
    
            return false;
        }

        //
        // convert text to tokens
        //
        while( cursor<text.length )
        {  
            if( tokenEaters.some( eater=>eat(eater) ) )
            {
                continue;
            } 

            // no matches... assume text only...
            //
            if( !nodes.length || !lastNodeIsText  ) // is the last node NOT a "text" node?
            {     
                nodes.push(<TextNode source={textBlocks} dataIndex={textBlocks.length} key={nodes.length}/>);
                lastNodeIsText = true;
                textBlocks.push("");
            }
    
            //append character at cursor...
            textBlocks[textBlocks.length-1] += text.charAt(cursor);
            
            cursor++;
        } 

        return nodes;

    },[text]);  

    return <>{tokenizedText}</>
}

/**
 * Represents raw text... 
 */
 const TextNode : React.FC<{ source:string[], dataIndex:number }> = (props) => {
    return <span>{props.source[props.dataIndex]}</span>
}
 