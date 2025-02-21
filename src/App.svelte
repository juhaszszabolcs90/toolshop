<script>
import { toolsStore, addTool, updateTool, deleteTool } from './lib/store';

let tools = [];
toolsStore.subscribe(value => {
    tools = value;
});

let editingTool = null;
let newTool = { name: '', price: '', description: '', imageUrl: '' };

function handleAdd() {
    if (newTool.name && newTool.price) {
        addTool({
            name: newTool.name,
            price: Number(newTool.price),
            description: newTool.description,
            imageUrl: newTool.imageUrl
        });
        newTool = { name: '', price: '', description: '', imageUrl: '' };
    }
}

function handleEdit(tool) {
    editingTool = { ...tool };
}

function handleUpdate() {
    if (editingTool && editingTool.name && editingTool.price) {
        updateTool(editingTool.id, editingTool);
        editingTool = null;
    }
}

function handleDelete(id) {
    deleteTool(id);
}
</script>

<main>
    <h1>Tool Shop</h1>

    <!-- Add new tool form -->
    <div class="form-section">
        <h2>Add New Tool</h2>
        <div class="form">
            <input bind:value={newTool.name} placeholder="Tool name" />
            <input type="number" bind:value={newTool.price} placeholder="Price" />
            <input bind:value={newTool.description} placeholder="Description" />
            <input bind:value={newTool.imageUrl} placeholder="Image URL" />
            <button on:click={handleAdd}>Add Tool</button>
        </div>
    </div>

    <!-- Tool list -->
    <div class="tools-list">
        <h2>Available Tools</h2>
        {#each tools as tool (tool.id)}
            <div class="tool-card">
                {#if editingTool && editingTool.id === tool.id}
                    <div class="edit-form">
                        <input bind:value={editingTool.name} />
                        <input type="number" bind:value={editingTool.price} />
                        <input bind:value={editingTool.description} />
                        <input bind:value={editingTool.imageUrl} />
                        <button on:click={handleUpdate}>Save</button>
                        <button on:click={() => editingTool = null}>Cancel</button>
                    </div>
                {:else}
                    <h3>{tool.name}</h3>
                    <p>${tool.price}</p>
                    <p>{tool.description}</p>
                    {#if tool.imageUrl}
                        <img src={tool.imageUrl} alt={tool.name} />
                    {/if}
                    <div class="actions">
                        <button on:click={() => handleEdit(tool)}>Edit</button>
                        <button on:click={() => handleDelete(tool.id)}>Delete</button>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #333;
        background-color: #f5f5f5;
    }

    h1, h2, h3 {
        color: #333;
    }

    .form-section {
        margin-bottom: 30px;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }

    .tools-list {
        display: grid;
        gap: 20px;
    }

    .tool-card {
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 8px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .tool-card h3 {
        margin: 0 0 10px 0;
        color: #2c3e50;
    }

    .tool-card p {
        margin: 5px 0;
        color: #34495e;
    }

    .actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

    button {
        padding: 8px 16px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: #45a049;
    }

    input {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #333;
        background-color: white;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .tool-card img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }
</style>
