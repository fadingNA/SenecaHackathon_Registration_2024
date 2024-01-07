import pino from 'pino';

const isDebug = (LOG_LEVEL: string) => {
  if (LOG_LEVEL === 'debug') {
    return {
      // https://github.com/pinojs/pino-pretty
      target: 'pino-pretty',
      option: {
        colorize: true,
      },
    };
  }
  return undefined;
};

const logger = pino({
  level: 'info',
  transport: isDebug('Debug' as string),
});

export default logger;
