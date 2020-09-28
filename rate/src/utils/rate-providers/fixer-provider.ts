import axios from 'axios';

export class FixerProvider {
  private buildUrl({
    base,
    symbols,
  }: {
    base: string;
    symbols: string;
  }): string {
    const { FIXER_BASE_URL, FIXER_API_KEY } = process.env;

    return `${FIXER_BASE_URL}latest?access_key=${FIXER_API_KEY}&base=${base}&symbols=${symbols}`;
  }

  async getRates(params: { base: string; symbols: string }) {
    const { data } = await axios.get(this.buildUrl(params));

    return data;
  }
}
