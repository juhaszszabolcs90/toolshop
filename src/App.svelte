<script>
import { toolsStore, addTool, updateTool, deleteTool } from './lib/store';

let tools = [];
toolsStore.subscribe(value => {
    tools = value;
});

let editingTool = null;
let newTool = { name: '', price: '', description: '' };

function handleAdd() {
    if (newTool.name && newTool.price) {
        addTool({
            name: newTool.name,
            price: Number(newTool.price),
            description: newTool.description
        });
        newTool = { name: '', price: '', description: '' };
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
                        <button on:click={handleUpdate}>Save</button>
                        <button on:click={() => editingTool = null}>Cancel</button>
                    </div>
                {:else}
                    <h3>{tool.name}</h3>
                    <p>${tool.price}</p>
                    <p>{tool.description}</p>
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
    }

    .form-section {
        margin-bottom: 30px;
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
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
