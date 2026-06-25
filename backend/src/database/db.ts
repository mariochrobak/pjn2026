import { Sequelize, DataTypes, Model } from 'sequelize';
import { runSeed } from './seed';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  //storage: './database.sqlite',
  logging: false
});


// Modelos

export class Ciudad extends Model {
  declare id: number;
  declare codigo: string; 
  declare nombre: string;
}
Ciudad.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.STRING(2), allowNull: false, unique: true }, 
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { sequelize, modelName: 'Ciudad', freezeTableName: true });


export class Fuero extends Model {
  declare id: number;
  declare codigo: string; // <-- NUEVO
  declare nombre: string;
}
Fuero.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.STRING(2), allowNull: false, unique: true }, 
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { sequelize, modelName: 'Fuero', freezeTableName: true });

export class Organismo extends Model {
  declare id: number;
  declare codigo: string; 
  declare nombre: string;
  declare idCiudad: number;
  declare idFuero: number;
}
Organismo.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: { type: DataTypes.STRING(5), allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  idCiudad: { type: DataTypes.INTEGER, allowNull: false },
  idFuero: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'Organismo', freezeTableName: true });


export class Persona extends Model {
  declare id: number;
  declare dni: string; 
  declare nombre: string;
  declare apellido: string;
}
Persona.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'Persona', freezeTableName: true });


export class Expediente extends Model {
  declare id: number;
  declare idOrganismo: number; 
  declare tipo: string;
  declare numero: number;
  declare anio: number;
  declare caratula: string;
}
Expediente.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idOrganismo: { type: DataTypes.INTEGER, allowNull: false },
  tipo: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  anio: { type: DataTypes.INTEGER, allowNull: false },
  caratula: { type: DataTypes.TEXT, allowNull: false }
}, { 
  sequelize, 
  modelName: 'Expediente', 
  freezeTableName: true,
  indexes: [{ unique: true, fields: ['idOrganismo', 'tipo', 'numero', 'anio'] }]
});


// Tabla Intermedia
export class ExpedientePersona extends Model {
  declare idExpediente: number;
  declare idPersona: number;
  declare idVinculo: number;
}
ExpedientePersona.init({
  idExpediente: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    references: { model: 'Expediente', key: 'id' }
  },
  idPersona: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    references: { model: 'Persona', key: 'id' }
  },
  idVinculo: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    allowNull: false 
  }
}, { sequelize, modelName: 'ExpedientePersona', freezeTableName: true });


// Relaciones

Organismo.belongsTo(Ciudad, { foreignKey: 'idCiudad' });
Ciudad.hasMany(Organismo, { foreignKey: 'idCiudad' });

Organismo.belongsTo(Fuero, { foreignKey: 'idFuero' });
Fuero.hasMany(Organismo, { foreignKey: 'idFuero' });


Expediente.belongsTo(Organismo, { foreignKey: 'idOrganismo' });
Organismo.hasMany(Expediente, { foreignKey: 'idOrganismo' });


Expediente.belongsToMany(Persona, { through: ExpedientePersona, foreignKey: 'idExpediente', otherKey: 'idPersona' });
Persona.belongsToMany(Expediente, { through: ExpedientePersona, foreignKey: 'idPersona', otherKey: 'idExpediente' });


ExpedientePersona.belongsTo(Expediente, { foreignKey: 'idExpediente' });
ExpedientePersona.belongsTo(Persona, { foreignKey: 'idPersona' });





export async function initDB() {
  await sequelize.sync({ force: true });
  console.log("Estructura de base de datos montada en MEMORIA.");
  await runSeed();
  console.log("Siembra de información en la base de datos completa.");
}