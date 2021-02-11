import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

/*
  {
    //key: ['erro1', 'erro2', ...]
    //exemplo: name: ['obrigatorio', 'minimo de caracteres']
  }
*/

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    // error.inner - onde fica os erros
    error.inner.forEach(err => {
      errors[err.path] = err.errors; // ex: errors['name'] = ['erro1', 'erro2', ...]
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  console.error(error);

  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
