//to read :::info and draw a live, editale UI box
import { $node, $view, $inputRule } from '@milkdown/utils';
import { wrappingInputRule } from '@milkdown/prose/inputrules';

//define the structural rules
export const schema = $node('infobox', () => ({
    group: 'block',
    content : 'block+', //contain paragraphs, lists, etc.
    defining: true,
    isolating: true, //prevent merging with adjacent nodes of the same type
    attrs: {
        kind: {default : 'info' } //accept dynamic attribute
    },

    //parse from HTML to ProseMirror
    parseDOM : [{ 
        tag : 'div.info-box', 
        getAttrs: (dom) => ({ kind: dom.dataset.kind})
    }],

    //render static html for final output
    toDOM: (node) => ['div', {
        class: 'info-box bg-blue-100 border-l-4 border-blue-500 p-4 rounded',
        'data-kind' : node.attrs.kind 
    }, 0],

    //translating markdown to proseMirror
    parseMarkdown : {
        match : (node) => {
            //check if AST node type is a 'containerDirective' and the name is 'info'
            return node.type === 'containerDirective' && ['info', 'warning', 'danger'].includes(node.name)
        },
        runner : (state, node, type) => {
            //open the node to process the children and close it 
            state.openNode(type, { kind: node.name }).next(node.children).closeNode();
        },
    },

    //translating proseMirror back to Markdown when saving
    toMarkdown : {
        match : (node) => node.type.name === 'infobox',
        runner : (state, node) => {
            //Tell the parser to write the opening ":::info\n", process the text inside, and write the closing ":::\n"
            state.addNode('containerDirective', undefined, undefined, { name: node.attrs.kind })
                .withChildren(node);
        },
    },
}));

//render the real-time interactive UI
export const infoBoxView = $view(schema, () => {    
    return (node) => { //pass node to read its attrs.
        const kind = node.attrs.kind;

        //create outer wrapper container
        const dom = document.createElement('div');
        const bgColors = {
            info: 'bg-blue-50 border-blue-500',
            warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
            danger: 'bg-red-50 border-red-500 text-red-900'
        };
        dom.className = `relative border-l-4 p-4 my-4 rounded shadow-sm ${bgColors[kind] || bgColors.info}`;

        //add visual icon or label
        const label = document.createElement('div');
        const icons = { info: 'ℹ️', warning: '⚠️', danger: '🚨' };
        
        label.className ='font-bold text-blue-700 mb-2 flex items-center gap-2 uppercase tracking-wide';
        label.innerHTML = `<span>${icons[kind] || 'ℹ️'}</span> ${kind}`;
        label.contentEditable = 'false'; // Prevent user from deleting the label!

        //create the editable content area
        const contentDOM = document.createElement('div');
        contentDOM.className = 'info-box-content text-blue-900';

        dom.appendChild(label);
        dom.appendChild(contentDOM);

        return {
            dom, 
            //assign the editable content to specific variable ProseMirror looks for.
            // When the user clicks inside the box and types,ProseMirror will map those keystrokes directly into this element
            contentDOM
        };
    };
});


//dynamic keyboard trigger
export const infoBoxInputRule = $inputRule((ctx) => {
    //listen for :::info, :::warning, or :::danger followed by a space to trigger the input rule
    return new wrappingInputRule(
        /^:::(info|warning|danger)\s$/, 
        schema.type(ctx),
        (match) => ({ kind: match[1] }) 
    );
});

//export the bundle
export const infoBoxPlugin = [schema, infoBoxView, infoBoxInputRule];