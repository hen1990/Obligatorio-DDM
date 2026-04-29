import databaseConection from './src/database/database-manager.js';

async function createTestExercise() {
    try {
        // Crear un ejercicio de prueba con URL de YouTube
        const result = await databaseConection.createEjercicio(
            'Ejercicio de Prueba',
            1, // ID de máquina (asumiendo que existe)
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        );
        console.log('Ejercicio creado:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

createTestExercise();