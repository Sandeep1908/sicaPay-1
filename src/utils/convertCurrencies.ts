import axios from "axios";

type Input = {
    from: string;
    to: string;
    amount: number;
}

export const convertCurrencies = async (input: Input) => {
    const url = process.env.EXCHANGE_API_ENDPOINT;
    const key = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
    if(input.from === input.to || input.from === 'usdt') return Promise.resolve({data: {result: input.amount}})
    return axios({
        url: `${url}/convert_to?from=${input.from}&to=${input.to}&amount=${input.amount}`,
        method: 'GET',
        headers: {
            apikey: key,
            Authorization: key
        }
    })
}