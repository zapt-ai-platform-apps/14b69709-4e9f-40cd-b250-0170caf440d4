import * as Sentry from '@sentry/browser';

/**
 * Creates a validator function for the given schema
 * @param {Object} schema - Schema to validate against
 * @param {string} contextName - Name of what's being validated
 * @returns {function} - Validator function
 */
export const createValidator = (schema, contextName) => {
  return (data, options = {}) => {
    const {
      actionName = 'unknown',
      location = 'unknown',
      direction = 'unknown',
      moduleFrom = 'unknown',
      moduleTo = 'unknown'
    } = options;

    try {
      // Simple validation for now
      for (const [key, config] of Object.entries(schema)) {
        if (config.required && (data[key] === undefined || data[key] === null)) {
          throw new Error(`${key} es requerido`);
        }
      }
      return data;
    } catch (error) {
      console.error(`Error de validación en ${contextName}:`, error.message);
      Sentry.captureException(error, {
        extra: {
          context: contextName,
          action: actionName,
          location,
          direction,
          flow: `${moduleFrom} → ${moduleTo}`,
        }
      });
      throw error;
    }
  };
};