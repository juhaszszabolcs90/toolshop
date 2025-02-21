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
    <h1>Szerszám Bolt</h1>

    <!-- Add new tool form -->
    <div class="form-section">
        <h2>Új Szerszám Hozzáadása</h2>
        <div class="form">
            <input bind:value={newTool.name} placeholder="Szerszám neve" />
            <input type="number" bind:value={newTool.price} placeholder="Ár" />
            <input bind:value={newTool.description} placeholder="Leírás" />
            <input bind:value={newTool.imageUrl} placeholder="Kép URL" />
            <button on:click={handleAdd}>Hozzáadás</button>
        </div>
    </div>

    <!-- Tool list -->
    <div class="tools-list">
        <h2>Elérhető Szerszámok</h2>
        {#each tools as tool (tool.id)}
            <div class="tool-card">
                {#if editingTool && editingTool.id === tool.id}
                    <div class="edit-form">
                        <input bind:value={editingTool.name} placeholder="Szerszám neve" />
                        <input type="number" bind:value={editingTool.price} placeholder="Ár" />
                        <input bind:value={editingTool.description} placeholder="Leírás" />
                        <input bind:value={editingTool.imageUrl} placeholder="Kép URL" />
                        <button on:click={handleUpdate}>Mentés</button>
                        <button on:click={() => editingTool = null}>Mégse</button>
                    </div>
                {:else}
                    <h3>{tool.name}</h3>
                    <p>{tool.price} Ft</p>
                    <p>{tool.description}</p>
                    {#if tool.imageUrl}
                        <div class="image-container">
                            <img src={tool.imageUrl} alt={tool.name} />
                        </div>
                    {/if}
                    <div class="actions">
                        <button on:click={() => handleEdit(tool)}>Szerkesztés</button>
                        <button on:click={() => handleDelete(tool.id)}>Törlés</button>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 40px;
        color: #333;
        background-color: white;
        min-height: 100vh;
        box-sizing: border-box;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
        text-align: center;
        color: #2c3e50;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: #2c3e50;
    }

    h3 {
        font-size: 1.6rem;
        color: #2c3e50;
    }

    .form-section {
        margin-bottom: 40px;
        background-color: #f8f9fa;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
    }

    .form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .tools-list {
        display: grid;
        gap: 30px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .tool-card {
        border: 1px solid #ddd;
        padding: 25px;
        border-radius: 12px;
        background: white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 100%;
        min-height: 400px;
        box-sizing: border-box;
    }

    .tool-card h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.8rem;
    }

    .tool-card p {
        margin: 8px 0;
        color: #34495e;
        font-size: 1.2rem;
    }

    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #f8f9fa;
        border-radius: 12px;
        margin: 15px 0;
        min-height: 250px;
        box-sizing: border-box;
    }

    .tool-card img {
        width: 100%;
        max-width: 100%;
        height: 250px;
        object-fit: contain;
        border-radius: 12px;
        background-color: #f8f9fa;
        padding: 15px;
        box-sizing: border-box;
    }

    .actions {
        display: flex;
        gap: 15px;
        margin-top: auto;
        padding: 0;
        box-sizing: border-box;
    }

    button {
        padding: 15px 30px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.2s;
        flex: 1;
    }

    button:hover {
        background: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    input {
        padding: 15px;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 1.2rem;
        width: 100%;
        box-sizing: border-box;
        background-color: white;
        color: #333;
    }

    input::placeholder {
        color: #999;
    }

    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        main {
            padding: 20px;
        }

        .form-section {
            padding: 20px;
        }

        .form {
            grid-template-columns: 1fr;
        }

        .tools-list {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .tool-card {
            min-height: 350px;
            padding: 20px;
        }
    }
</style>
