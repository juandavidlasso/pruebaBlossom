import { Request, Response, NextFunction } from 'express';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
  magenta: '\x1b[35m',
};

const getStatusColor = (status: number): string => {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  return colors.green;
};

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const body = req.body && typeof req.body === 'object' ? req.body : null;
    const operationName = body?.operationName;

    if (operationName === 'IntrospectionQuery' || operationName === 'SchemaPoll') {
      return;
    }
    
    const duration = Date.now() - start;
    const statusColor = getStatusColor(res.statusCode);
    
    const gqlInfo = operationName 
      ? `\n  ${colors.cyan}GraphQL:${colors.reset}  ${colors.bright}${operationName}${colors.reset}` 
      : '';

    console.log(
      `\n${colors.bright}${colors.magenta}━━━ REQUEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n` +
      `  ${colors.cyan}Method:${colors.reset}   ${req.method}\n` +
      `  ${colors.cyan}URL:${colors.reset}      ${req.url}${gqlInfo}\n` +
      `  ${colors.cyan}Status:${colors.reset}   ${statusColor}${res.statusCode}${colors.reset}\n` +
      `  ${colors.cyan}Duration:${colors.reset} ${duration}ms\n` +
      `  ${colors.cyan}Time:${colors.reset}     ${new Date().toLocaleTimeString()}\n` +
      `${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`
    );
  });

  next();
};