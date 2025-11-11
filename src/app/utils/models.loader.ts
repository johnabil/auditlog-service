import fs from 'node:fs';
import path from 'node:path';
import {Sequelize} from "sequelize";

export async function loadModels(sequelize: Sequelize) {
    const modelsDir = path.join(__dirname, '../models');
    const files = fs.readdirSync(modelsDir);
    for (let file of files) {
        if (file.endsWith('.model.ts') || file.endsWith('.model.js')) {
            file = file.replace('.js', '.ts');
            const model = require(`${modelsDir}/${file}`);
            model.initModel(sequelize);
        }
    }
};
