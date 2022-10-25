# React Text Tokenizer
the goal of this component is to take a string and an array of "tokenizers" and it will parse the string to create an array of React Nodes instead. This is useful to, for example, replace video links or ascii emojis to their respective visual/interactive representations...

## Example

```jsx
import { TextTokenizer } from "react-text-tokenizer"
import type { TokenEater } from "react-text-tokenizer"


const SmileyToken:TextTokenizer = {
    match: /^(\:\))/,
    getReactNode : (m, key) => <span key={key}>[Emoji:{m[1]}]</span>,
}

const tokenEaters = [
    SmileyToken
] 

/**
 * Recieves a user typed text and it parses it to convert recognizable tokens into visual elements.
 */
const UserText = ()=> { 
    return <TextTokenizer text="Hello :) world! " tokenEaters={tokenEaters} /> 
} 

```

# API

## TextTokenizer
this is the component that takes the string and token eaters you define and will internally handle the tokenization of the string into React Nodes. Parameters:
- **text** the string that will be used to tokenize
- **tokenEaters** array of `TokenEater` handlers YOU define.

## TokenEater
This is an object that given a regexp, if matched, it will return a ReactNode. Params:
- **match** the Regexp to match the relevant string (must start with ^)
- **getReactNode** function that recieves [the result of the match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) and a `key` that should be used as the `key` value of the returned node.