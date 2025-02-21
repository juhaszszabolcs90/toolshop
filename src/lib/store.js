import { writable } from 'svelte/store';

const API_URL = 'http://localhost:3000/api';

// Create the store
export const toolsStore = writable([]);

// Load initial data
export const loadTools = async () => {
    try {
        const response = await fetch(`${API_URL}/tools`);
        const data = await response.json();
        toolsStore.set(data);
    } catch (error) {
        console.error('Error loading tools:', error);
    }
};

// Add new tool
export const addTool = async (tool) => {
    try {
        const response = await fetch(`${API_URL}/tools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tool),
        });
        const data = await response.json();
        if (data.id) {
            toolsStore.update(tools => [...tools, { ...tool, id: data.id }]);
        }
    } catch (error) {
        console.error('Error adding tool:', error);
    }
};

// Update tool
export const updateTool = async (id, updatedTool) => {
    try {
        const response = await fetch(`${API_URL}/tools/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTool),
        });
        if (response.ok) {
            toolsStore.update(tools =>
                tools.map(tool => tool.id === id ? { ...tool, ...updatedTool } : tool)
            );
        }
    } catch (error) {
        console.error('Error updating tool:', error);
    }
};

// Delete tool
export const deleteTool = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tools/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            toolsStore.update(tools => tools.filter(tool => tool.id !== id));
        }
    } catch (error) {
        console.error('Error deleting tool:', error);
    }
};
