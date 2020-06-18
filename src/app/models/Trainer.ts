import { User } from './User';
import { Course } from './Course';

export class Trainer extends User {
    trainerID: number;
    courseID: number;
    courseName: string;
    feedback: string;
}
