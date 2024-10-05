export interface aluno{
    email:string,
    name:string,
    lastname:string,
}

export interface optionsForName{
    id:number
    name:string,
    lastname:string,
    email:string
}

export interface classes{
    id:number,
    dia:string,
    horario:string
}

export interface approveList{
    id:number,
    idprofessor:number,
    idaluno:number
    horario:string,
    dia:string
}
