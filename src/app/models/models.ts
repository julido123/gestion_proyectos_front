export interface Sede {
    id: number;
    nombre: string;
}

export interface Area {
    id: number;
    nombre: string;
}

export interface Idea {
    id: number;
    titulo: string;
    descripcion: string;
    usuario: string;
    tipo: string;
    sede: string;
    area: string;
    estado: string;
    fecha_creacion: string;
    archivos?: File[]; 
    calificaciones?: Calificacion[];
}

export interface Calificacion {
    id?: number; // ID opcional, asumimos que se podría agregar al recibir datos del backend
    idea: number; // ID de la idea asociada
    usuario?: number; // ID del usuario (null si no está presente)

    // Puntuación general
    puntuacion_general?: number; // Opcional, escala de 1 a 10

    // Calificaciones específicas
    factibilidad?: number; // Escala de 1 a 10, opcional
    viabilidad?: number; // Escala de 1 a 10, opcional
    impacto?: number; // Escala de 1 a 10, opcional

    // Comentario adicional
    comentario?: string; // Comentario opcional

    // Promedio de las calificaciones específicas, asumimos que el backend lo calcula
    promedio?: number; // Opcional, calculado en el backend
}

export interface UserRanking {
    username: string;
    total_ideas: number;
    promedio_calificacion: number;
}

export interface IdeasPorTipo {
    total: number;
    por_tipo: {
        oportunidad: number;
        problema: number;
        reto: number;
        [key: string]: number; // Para soportar otros tipos futuros
    };
}

export interface IdeasPorArea {
    [area: string]: {
        problema: number;
        oportunidad: number;
        reto: number;
        [key: string]: number; // Para otros tipos si se agregan
    };
}

export interface IdeasPorSede {
    [sede: string]: {
        problema: number;
        oportunidad: number;
        reto: number;
        [key: string]: number; // Para otros tipos
    };
}

export interface DetalleEncuestaPorSede {
    sede__nombre: string;
    total_ideas: number;
    problemas: number;
    oportunidades: number;
    retos: number;
    promedio_calificacion: number | null;
}
