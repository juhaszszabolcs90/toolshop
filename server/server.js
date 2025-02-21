import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { dbPath } from './config.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const sqlite = sqlite3.verbose();

// Create SQLite database connection
const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        // Create tools table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS tools (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            imageUrl TEXT
        )`);
    }
});

// GET all tools
app.get('/api/tools', (req, res) => {
    db.all('SELECT * FROM tools', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET single tool
app.get('/api/tools/:id', (req, res) => {
    db.get('SELECT * FROM tools WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

// POST new tool
app.post('/api/tools', (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    db.run(
        'INSERT INTO tools (name, price, description, imageUrl) VALUES (?, ?, ?, ?)',
        [name, price, description, imageUrl],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        }
    );
});

// PUT update tool
app.put('/api/tools/:id', (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    db.run(
        'UPDATE tools SET name = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
        [name, price, description, imageUrl, req.params.id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ changes: this.changes });
        }
    );
});

// DELETE tool
app.delete('/api/tools/:id', (req, res) => {
    db.run('DELETE FROM tools WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ deleted: this.changes > 0 });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
