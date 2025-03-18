// Utility functions for API endpoints
export function formatError(message, statusCode = 500) {
  return {
    error: message,
    statusCode
  };
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.trim();
}