import { writable } from 'svelte/store';

// Initial tools data
const initialTools = [
    { id: 1, name: 'Hammer', price: 19.99, description: 'A sturdy hammer for all your needs' },
    { id: 2, name: 'Screwdriver', price: 9.99, description: 'Phillips head screwdriver' },
    { id: 3, name: 'Wrench', price: 14.99, description: 'Adjustable wrench' }
];

// Create the store
export const toolsStore = writable(initialTools);

// Store actions
export const addTool = (tool) => {
    toolsStore.update(tools => {
        const newId = Math.max(...tools.map(t => t.id)) + 1;
        return [...tools, { ...tool, id: newId }];
    });
};

export const updateTool = (id, updatedTool) => {
    toolsStore.update(tools => 
        tools.map(tool => tool.id === id ? { ...tool, ...updatedTool } : tool)
    );
};

export const deleteTool = (id) => {
    toolsStore.update(tools => tools.filter(tool => tool.id !== id));
};
