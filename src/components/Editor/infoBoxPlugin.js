//to read :::info and draw a live, editale UI box
import { $node, $view, $inputRule } from '@milkdown/utils';
import { wrappingInputRule } from '@milkdown/prose/inputrules';

//define the structural rules
export const schema = $node('infobox', () => ({
    group: 'block',
    content : 'block+', //contain paragraphs, lists, etc.
    defining: true,
    isolating: true, //prevent merging with adjacent nodes of the same type

    //parse from HTML to ProseMirror
    parseDOM : [{ tag : 'div.info-box' }], 

    //render static html for final output
    toDOM: () => ['div', {class: 'info-box bg-blue-100 border-l-4 border-blue-500 p-4 rounded' }, 0],

    //translating markdown to proseMirror
    parseMarkdown : {
        match : (node) => {
            //check if AST node type is a 'containerDirective' and the name is 'info'
            return node.type === 'containerDirective' && node.name === 'info';
        },
        runner : (state, node, type) => {
            //open the node to process the children and close it 
            state.openNode(type).next(node.children).closeNode();
        },
    },

    //translating proseMirror back to Markdown when saving
    toMarkdown : {
        match : (node) => node.type.name === 'infobox',
        runner : (state, node) => {
            //Tell the parser to write the opening ":::info\n", process the text inside, and write the closing ":::\n"
            state.addNode('containerDirective', undefined, undefined, { name: 'info' })
                .withChildren(node);
        },
    },
}));

//render the real-time interactive UI
export const infoBoxView = $view(schema, () => {    
    return () => {
        //create outer wrapper container
        const dom = document.createElement('div');
        dom.className = 'my-custom-info-box relative bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded shadow-sm';

        //add visual icon or label
        const label = document.createElement('div');
        label.className ='font-bold text-blue-700 mb-2 flex items-center gap-2';
        label.innerHTML = `<span>ℹ️</span> INFO`;
        label.contentEditable = false; // Prevent user from deleting the label!

        //create the editable content area
        const contentDOM = document.createElement('div');
        contentDOM.className = 'info-box-content text-blue-900';

        dom.appendChild(label);
        dom.appendChild(contentDOM);

        return {
            dom, 
            //assign the editable content to specific variable ProseMirror looks for.
            // When the user clicks inside the box and types,ProseMirror will map those keystrokes directly into this element
            contentDOM: contentDOM,
        };
    };
});

export const infoBoxInputRule = $inputRule((ctx) => {
    return wrappingInputRule(/^:::info\s$/, schema.type(ctx));
});

//export the bundle
export const infoBoxPlugin = [schema, infoBoxView, infoBoxInputRule];