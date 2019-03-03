export interface IUser {
  id: string;
  profile: IUserProfile;
}

export interface IUserProfile {
  gender: Gender;
  dateOfBirth: Date;
  initialPanicAttackDate: Date;
  sleep: number;
  isShabbatKeeper: boolean;
  isSmoking: boolean;
  familyStatus: FamilyStatus;
  traumaType: TraumaType;
  medicalInformation: MedicalInformation;
  stressHours: number[];
  stressfullPlaces: string[];
}

interface MedicalInformation {
  isTaking: boolean;
  drugs: string[];
}

enum Gender {
  MALE,
  FEMALE,
}

enum TraumaType {
  SEX_ASSAULT,
  ARMY,
}

interface FamilyStatus {
  isMarried: boolean;
  numberOfChildren: number;
}
