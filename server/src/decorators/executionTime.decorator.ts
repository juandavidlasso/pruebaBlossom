const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

export const ExecutionTime = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = Date.now();

    return Promise.resolve(originalMethod.apply(this, args))
      .then((result) => {
        const duration = Date.now() - start;

        console.log(
          `\n${colors.bright}${colors.blue}⏱  EXECUTION TIME${colors.reset}\n` +
          `   ${colors.yellow}${target.constructor.name}.${propertyKey}${colors.reset} → ${colors.bright}${duration}ms${colors.reset}\n`
        );

        return result;
      })
      .catch((error) => {
        const duration = Date.now() - start;
        console.log(
          `\n${colors.bright}${colors.blue}⏱  EXECUTION TIME (FAILED)${colors.reset}\n` +
          `   ${colors.yellow}${target.constructor.name}.${propertyKey}${colors.reset} → ${colors.bright}${duration}ms${colors.reset}\n`
        );
        throw error;
      });
  };

  return descriptor;
}