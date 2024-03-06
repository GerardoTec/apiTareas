import { InternalServerErrorException, Logger } from "@nestjs/common";

const logs = (error,services)=>{

    const  logger = new Logger(services);

    return logger.error(error);
}

export const handleDBExceptions = (error, services) =>{
    if(error.code === 'ER_DUP_ENTRY'){
        throw new InternalServerErrorException(error.sqlMessage);
    }
    if(error.code === 'ER_NO_DEFAULT_FOR_FIELD'){
        throw new InternalServerErrorException(error.sqlMessage);
    }
    logs(error,services);
    throw new Error('ocurrio un error, favor de revisar los logs.')
}