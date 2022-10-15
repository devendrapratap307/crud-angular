import { Address } from "./address-dto";

export class Employee {
    id ?: number;
    firstName ?: string;
    lastName ?: string;
    email ?:string;
    gender ?: string;
    dob ?: string;
    salary ?: number;
    projectIds ?: string;
    projectList ?: number[];
    address ?: Address;
}
