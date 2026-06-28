const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const {
    API_KEY,
    ACCESS_TOKEN,
} = process.env;

if (!API_KEY || !ACCESS_TOKEN) {
    throw new Error('Faltan API_KEY o ACCESS_TOKEN en el archivo .env');
}

const content = `export const environment = {
    apiKey: '${API_KEY}',
    accessToken: '${ACCESS_TOKEN}'
};
`;

const targetDir = path.resolve(__dirname, '..', 'src', 'environments');

fs.writeFileSync(path.join(targetDir, 'environment.ts'), content, 'utf8');
fs.writeFileSync(path.join(targetDir, 'environment.development.ts'), content, 'utf8');

console.log('Environments generados desde .env');