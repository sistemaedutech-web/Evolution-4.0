
export interface AssessmentData {
  identification: {
    name: string;
    sex: string;
    trained: string;
    phone: string;
    mobile: string;
    email: string;
    profession: string;
    address: string;
    birthDate: string;
    age: string;
    assessmentDate: string;
    nextAssessmentDate: string;
    assessor: string;
    time: string;
    objective: string;
  };
  anthropometrics: {
    height: string;
    weight: string;
    bmi: string;
    conicityIndex: string;
    whr: string;
    whrRisk: string;
    bloodPressure: string;
    restingBloodPressure: string;
  };
  perimeters: {
    shoulders: string;
    chest: string;
    waist: string;
    abdomen: string;
    hip: string;
    forearmR: string;
    forearmL: string;
    armR: string;
    armL: string;
    thighR: string;
    thighL: string;
    calfR: string;
    calfL: string;
  };
  skinfolds: {
    triceps: string;
    subscapular: string;
    suprailiac: string;
    abdominal: string;
    supraspinale: string;
    thigh: string;
    calf: string;
    chest: string;
    midaxillary: string;
    biceps: string;
  };
  cardio: {
    restingHR: string;
    maxHR: string;
    lowerLimitHR: string;
    upperLimitHR: string;
    recoveryHR: string;
    vo2max: string;
  };
  neuromuscular: {
    abdominalReps: string;
    abdominalClass: string;
    pushupReps: string;
    pushupClass: string;
  };
  bodyCompAssessment: {
    protocol: string;
    fatPercentage: string;
    fatPercentageClass: string;
  };
  bodyComposition: {
    fatWeight: string;
    leanMass: string;
    currentWeight: string;
    desiredWeight: string;
  };
  postural: {
    indication: string;
  };
}

export const initialAssessmentData: AssessmentData = {
  identification: {
    name: "ivan lima de azevedo",
    sex: "Fem",
    trained: "Sim",
    phone: "",
    mobile: "9984457890",
    email: "",
    profession: "",
    address: "rua 1 n 24 vila ipiranga",
    birthDate: "1968-05-10",
    age: "57 anos 2 meses",
    assessmentDate: "2025-10-29",
    nextAssessmentDate: "2026-01-29",
    assessor: "40",
    time: "17:00",
    objective: "perda de peso",
  },
  anthropometrics: {
    height: "164.00",
    weight: "70.00",
    bmi: "26.03",
    conicityIndex: "1.31",
    whr: "0.96",
    whrRisk: "Muito Alto",
    bloodPressure: "14",
    restingBloodPressure: "9",
  },
  perimeters: {
    shoulders: "111.00",
    chest: "99.00",
    waist: "93.00",
    abdomen: "97.00",
    hip: "97.00",
    forearmR: "28.00",
    forearmL: "27.00",
    armR: "34.00",
    armL: "31.00",
    thighR: "52.00",
    thighL: "51.00",
    calfR: "37.00",
    calfL: "37.00",
  },
  skinfolds: {
    triceps: "19.00",
    subscapular: "26.00",
    suprailiac: "35.00",
    abdominal: "27.00",
    supraspinale: "28.00",
    thigh: "23.00",
    calf: "18.00",
    chest: "12.00",
    midaxillary: "17.00",
    biceps: "4.00",
  },
  cardio: {
    restingHR: "72.0",
    maxHR: "174.0",
    lowerLimitHR: "127.2",
    upperLimitHR: "158.8",
    recoveryHR: "122.5",
    vo2max: "25.06",
  },
  neuromuscular: {
    abdominalReps: "9",
    abdominalClass: "Médio",
    pushupReps: "6",
    pushupClass: "Médio",
  },
  bodyCompAssessment: {
    protocol: "Guedes (1985)",
    fatPercentage: "30.31",
    fatPercentageClass: "Média",
  },
  bodyComposition: {
    fatWeight: '21.22',
    leanMass: '48.78',
    currentWeight: '70.00',
    desiredWeight: '66.00',
  },
  postural: {
    indication: 'treino de segunda a sabado'
  }
};
