import * as bcrypt from 'bcryptjs';


export const  construirHtmlCorreo = (nombre:string, contraseña:string) =>{
    const html = `
    <body style="background-color: #fff;">
      <h5 style="color: #000; font-size: 20px; text-align: center;">BIENVENIDO</h5>
      <p style="color: #000; font-size: 16px; text-align: center;">${nombre}</p>
      <p style="color: #000; font-size: 14px; text-align: center;">A continuación se te generó una contraseña temporal para entrar al sistema</p>
      <p style="color: #000; font-size: 18px; text-align: center; font-weight: 800;">${contraseña}</p>
    </body>
  `
    return html;
}

export const generatePassword = (longitud)=>{
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=+';

  let contraseña = '';
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contraseña += caracteres.charAt(indice);
  }

  return contraseña;
}

export async function encriptarContraseña(password:string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword =  await bcrypt.hash(password, saltRounds);

  return hashedPassword;
}