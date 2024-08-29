export interface AppointmentBasicInfo {
    id_appointment: number
    patient: string
    starting_time: string //Manjear como DateTime
}

export interface NutriCards {
    big: string
    small: string
}

export interface GastoEnergetico {
    ger: number
    get: number
}

export interface PorcionesComida {
    verduras: number
    frutas: number
    cereales: number
    cerealesConGrasa: number
    legumistringsas: number
    alimentosDeOrigenAnimalMuyBajosEnGrasa: number
    alimentosDeOrigenAnimalBajosEnGrasa: number
    alimentosDeOrigenAnimalModeradosEnGrasa: number
    alimentosDeOrigenAnimalAltoContenidoDeGrasa: number
    lecheDescremada: number
    grasas: number
    grasasConProteina: number
    azucares: number
    azucaresConGrasa: number
    sumaKcal: number
    sumaProteinas: number
    sumaLipidos: number
    sumaCarbohidratos: number
    lecheEntera: number
}

export interface DietByidPlan {
    id: number
    patientEmail: string
    goal: null
    date: null
    comment: null
    breakfast1: string
    colation1_1: string
    lunch1: string
    colation2_1: string
    dinner1: string
    breakfast2: string
    colation1_2: string
    lunch2: string
    colation2_2: string
    dinner2: string
}

export interface Aliments {
    id: number
    name: string
    group: string
    quantity: string
    unit: string
    kcal: string
    carbs: string
    fats: string
    proteins: string
    cantidad?: number | undefined
}

export interface Meal {
    alimentId: number
    quantity: number
}

export interface Patients {
    email: string
    first_name: string
    last_name: string
}

export interface PatientRecord {
    id: number
    patientHeight: number
    patientWeight: number
    date: string
}