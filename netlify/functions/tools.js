// In-memory adatbázis (később ezt lehet majd egy valódi adatbázisra cserélni)
let tools = [
    { id: 1, name: 'Kalapács', price: 19.99, description: 'Strapabíró kalapács minden célra', imageUrl: 'https://example.com/hammer.jpg' },
    { id: 2, name: 'Csavarhúzó', price: 9.99, description: 'Phillips fejű csavarhúzó', imageUrl: 'https://example.com/screwdriver.jpg' },
    { id: 3, name: 'Villáskulcs', price: 14.99, description: 'Állítható villáskulcs', imageUrl: 'https://example.com/wrench.jpg' }
];

exports.handler = async (event, context) => {
    const path = event.path.replace('/.netlify/functions/tools', '');
    const segments = path.split('/').filter(Boolean);
    const method = event.httpMethod;

    try {
        // GET /api/tools
        if (method === 'GET' && segments.length === 0) {
            return {
                statusCode: 200,
                body: JSON.stringify(tools)
            };
        }

        // GET /api/tools/:id
        if (method === 'GET' && segments.length === 1) {
            const tool = tools.find(t => t.id === parseInt(segments[0]));
            if (!tool) {
                return { statusCode: 404, body: 'Tool not found' };
            }
            return {
                statusCode: 200,
                body: JSON.stringify(tool)
            };
        }

        // POST /api/tools
        if (method === 'POST' && segments.length === 0) {
            const body = JSON.parse(event.body);
            const newTool = {
                id: tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1,
                ...body
            };
            tools.push(newTool);
            return {
                statusCode: 201,
                body: JSON.stringify(newTool)
            };
        }

        // PUT /api/tools/:id
        if (method === 'PUT' && segments.length === 1) {
            const body = JSON.parse(event.body);
            const id = parseInt(segments[0]);
            const index = tools.findIndex(t => t.id === id);
            if (index === -1) {
                return { statusCode: 404, body: 'Tool not found' };
            }
            tools[index] = { ...tools[index], ...body };
            return {
                statusCode: 200,
                body: JSON.stringify(tools[index])
            };
        }

        // DELETE /api/tools/:id
        if (method === 'DELETE' && segments.length === 1) {
            const id = parseInt(segments[0]);
            const index = tools.findIndex(t => t.id === id);
            if (index === -1) {
                return { statusCode: 404, body: 'Tool not found' };
            }
            tools = tools.filter(t => t.id !== id);
            return {
                statusCode: 200,
                body: JSON.stringify({ deleted: true })
            };
        }

        return {
            statusCode: 404,
            body: 'Not found'
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Internal server error: ' + error.message
        };
    }
};
