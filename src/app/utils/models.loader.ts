import fs from 'node:fs';
import path from 'node:path';
import {Sequelize} from "sequelize";

export async function loadModels(sequelize: Sequelize) {
    const modelsDir = path.join(__dirname, '../models');
    const files = fs.readdirSync(modelsDir);
    for (const file of files) {
        if (file.endsWith('.model.ts') || file.endsWith('.model.js')) {
            const model_path = file.replace(/(\.model)\.(js|ts)$/i, '.model');
            const model = require(`${modelsDir}/${model_path}`);
            model.initModel(sequelize);
        }

        //loading associate relations
        for (const model_name in sequelize.models) {
            const model = sequelize.models[model_name];
            // @ts-ignore
            if (model?.associate) {
                // @ts-ignore
                model.associate(sequelize.models);
            }
        }
    }
};
