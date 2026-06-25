import { Ciudad, Fuero, Organismo, Persona, Expediente, ExpedientePersona } from './db';

export async function runSeed() {
    
//  Ciudades
  await Ciudad.bulkCreate([
    { id: 1, codigo: 'NQ', nombre: 'Neuquén' },
    { id: 2, codigo: 'ZA', nombre: 'Zapala' },
    { id: 3, codigo: 'JU', nombre: 'Junín de los Andes' },
    { id: 4, codigo: 'SM', nombre: 'San Martín de los Andes' }
  ]);

  // Fueros
  await Fuero.bulkCreate([
    { id: 1, codigo: 'FA', nombre: 'Familia' },
    { id: 2, codigo: 'EJ', nombre: 'Ejecutivos' },
    { id: 3, codigo: 'CI', nombre: 'Civil' },
    { id: 4, codigo: 'LA', nombre: 'Laboral' }
  ]);
  
  // Organismos
  await Organismo.bulkCreate([
    { id: 1, codigo: 'JNQFA', nombre: 'Juzgado de Familia N° 1 - Neuquén', idCiudad: 1, idFuero: 1 },
    { id: 2, codigo: 'JNQEJ', nombre: 'Juzgado de Ejecución N° 2 - Neuquén', idCiudad: 1, idFuero: 2 },
    { id: 3, codigo: 'JNQCI', nombre: 'Juzgado Civil N° 3 - Neuquén', idCiudad: 1, idFuero: 3 },
    { id: 4, codigo: 'JNQLA', nombre: 'Juzgado Laboral N° 1 - Neuquén', idCiudad: 1, idFuero: 4 },
    { id: 5, codigo: 'JZACI', nombre: 'Juzgado Civil N° 1 - Zapala', idCiudad: 2, idFuero: 3 },
    { id: 6, codigo: 'JZAFA', nombre: 'Juzgado de Familia N° 1 - Zapala', idCiudad: 2, idFuero: 1 },
    { id: 7, codigo: 'JJUCI', nombre: 'Juzgado Civil N° 1 - Junín', idCiudad: 3, idFuero: 3 },
    { id: 8, codigo: 'JJULA', nombre: 'Juzgado Laboral N° 1 - Junín', idCiudad: 3, idFuero: 4 }
  ]);

  //  Personas
  await Persona.bulkCreate([
    { id: 1, dni: '26123456', nombre: 'Mario Alejandro', apellido: 'Pérez' },
    { id: 2, dni: '27654321', nombre: 'Marisa', apellido: 'Catalá' },
    { id: 3, dni: '20111222', nombre: 'Dora', apellido: 'Macchi' },
    { id: 4, dni: '22333444', nombre: 'Emilce', apellido: 'Pérez' },
    { id: 5, dni: '30444555', nombre: 'Juan Carlos', apellido: 'Gómez' },
    { id: 6, dni: '32666777', nombre: 'Ana María', apellido: 'Rodríguez' },
    { id: 7, dni: '18999111', nombre: 'Pedro Lorenzo', apellido: 'López' },
    { id: 8, dni: '40222333', nombre: 'Sofía Belén', apellido: 'Martínez' }
  ]);

  // Expedientes
  await Expediente.bulkCreate([
    { id: 1, idOrganismo: 1, tipo: 'EXP', numero: 150, anio: 2024, caratula: 'Pérez Mario c/ Catalá Marisa s/ Divorcio Contencioso' },
    { id: 2, idOrganismo: 5, tipo: 'LEG', numero: 840, anio: 2025, caratula: 'Macchi Dora s/ Sucesión Ab Intestato' },
    { id: 3, idOrganismo: 2, tipo: 'EXP', numero: 99, anio: 2026, caratula: 'Gómez Juan c/ López Pedro s/ Ejecución Prendaria' },
    { id: 4, idOrganismo: 4, tipo: 'EXP', numero: 450, anio: 2024, caratula: 'Rodríguez Ana c/ Empresa Del Sur SRL s/ Despido Incausado' },
    { id: 5, idOrganismo: 6, tipo: 'EXP', numero: 1202, anio: 2025, caratula: 'Martínez Sofía s/ Reclamao de Alimentos' },
    { id: 6, idOrganismo: 7, tipo: 'LEG', numero: 310, anio: 2024, caratula: 'López Pedro c/ Gómez Juan s/ Interdicto de Recobrar' },
    { id: 7, idOrganismo: 8, tipo: 'EXP', numero: 88, anio: 2026, caratula: 'Pérez Emilce c/ Estado Provincial s/ Diferencias Salariales' },
    { id: 8, idOrganismo: 3, tipo: 'EXP', numero: 2150, anio: 2025, caratula: 'Catalá Marisa c/ Aseguradora Patagónica s/ Daños y Perjuicios' }
  ]);

  // Intervinientes
  await ExpedientePersona.bulkCreate([
    { idExpediente: 1, idPersona: 1, idVinculo: 1 }, { idExpediente: 1, idPersona: 2, idVinculo: 2 }, 
    { idExpediente: 2, idPersona: 3, idVinculo: 1 }, { idExpediente: 2, idPersona: 4, idVinculo: 2 }, 
    { idExpediente: 3, idPersona: 5, idVinculo: 1 }, { idExpediente: 3, idPersona: 7, idVinculo: 2 },
    { idExpediente: 4, idPersona: 6, idVinculo: 1 }, { idExpediente: 4, idPersona: 1, idVinculo: 2 },
    { idExpediente: 5, idPersona: 8, idVinculo: 1 }, { idExpediente: 5, idPersona: 7, idVinculo: 3 },
    { idExpediente: 6, idPersona: 7, idVinculo: 1 }, { idExpediente: 6, idPersona: 5, idVinculo: 2 },
    { idExpediente: 7, idPersona: 4, idVinculo: 1 },
    { idExpediente: 8, idPersona: 2, idVinculo: 1 }, { idExpediente: 8, idPersona: 6, idVinculo: 2 }
  ]);
}