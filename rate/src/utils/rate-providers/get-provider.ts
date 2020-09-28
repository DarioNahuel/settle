import { FixerProvider } from './fixer-provider';
import { NotFoundError } from '../errors';

export interface Provider {
  [provider: string]: any;
}

const providers: Provider = {
  fixer: new FixerProvider(),
};

export const getProviderInstance = (provider: string) => {
  const instanceProvider = providers[provider];

  if (!instanceProvider) {
    throw new NotFoundError();
  }

  return instanceProvider;
};
