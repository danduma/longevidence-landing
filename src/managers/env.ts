const envCache = new Map<keyof ImportMetaEnv, string>();

export const getEnvVar = (key: keyof ImportMetaEnv): string => {
  if (envCache.has(key)) {
    return envCache.get(key) as string;
  }

  const value = import.meta.env[key];
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  envCache.set(key, value);
  return value;
};

export const getJsonEnv = <T>(key: keyof ImportMetaEnv): T => {
  const raw = getEnvVar(key);
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON from environment variable ${key}: ${(error as Error).message}`);
  }
};
