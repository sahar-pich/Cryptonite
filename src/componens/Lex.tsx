import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

type CoinMarketData = {
    name: string,
    current_price_usd: number,
    market_cap_usd: number,
    total_volume_usd: number,
    price_change_percentage_30d_in_currency: number,
    price_change_percentage_60d_in_currency: number,
    price_change_percentage_200d_in_currency: number
}


const Lex = () => {

    // Coins Data
    const selectedSliders = useSelector((state: any) => state.selectedSliders)
    const [coinMarketData, setCoinMarketData] = useState<CoinMarketData>()

    const handleCoinData = async (id: string) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?market_data=true`)
            const data = await response.json();
            setCoinMarketData(
                {
                    name: data.name,
                    current_price_usd: data.market_data.current_price.usd,
                    market_cap_usd: data.market_data.market_cap.usd,
                    total_volume_usd: data.market_data.total_volume.usd,
                    price_change_percentage_30d_in_currency: data.market_data.price_change_percentage_30d_in_currency.usd,
                    price_change_percentage_60d_in_currency: data.market_data.price_change_percentage_60d_in_currency.usd,
                    price_change_percentage_200d_in_currency: data.market_data.price_change_percentage_200d_in_currency.usd,
                }
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    // AI Agent
    const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (loading) return;

        setLoading(true);
        if (coinMarketData === undefined) {
            return errorMessage();
        }

        const response = await fetch("/nvidia/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: `You are a crypto investment advisor. Only answer questions related to cryptocurrency investments. Be concise and direct
                                The site name is: Cryptonite
                                You name is Lex.
                                Structure your response exactly like this:
                                1. Is it worth it or not to buy the coin?
                                line break
                                2. An explanatory paragraph describing why it is worth or not worth purchasing the coin.
                                line break
                                Show the coin object values in a nice way but don't tell you we're given a JSON object.
                                `

                    },
                    {
                        role: "user",
                        content: `Should I invest in this coin?: ${JSON.stringify(coinMarketData)}`
                    }]
            })
        });

        const data = await response.json();
        setAnswer(data.choices[0].message.content);
        setLoading(false);
    };

    // Error Message
    const errorMessage = async () => {
        const response = await fetch("/nvidia/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: `
                        Write no more than 10 words and no line breaks!
                        The user didn't choose from the coins radio buttons above.
                        1. Must get an object with the coin data but don't tell the user. show error for not choosing from radio buttons above.
                        2. You are a crypto investment advisor. Only answer questions related to cryptocurrency investments. Be concise and direct.
                        3. Don't use "".`
                    },
                ]
            })
        });
        const data = await response.json();
        setAnswer(data.choices[0].message.content);
        setLoading(false);
    };

    // Welcome Message
    const [welcome, setWelcome] = useState('...');

    const welcomeMessage = async () => {
        const response = await fetch("/nvidia/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: `
                        Write no more than 10 words and no line breaks!
                        Show a welcome and encouraging message
                        The user must select from the radio buttons above to choose from available coins.
                        You are a crypto investment advisor. Only answer questions related to cryptocurrency investments. Be concise and direct.
                        The site name is: Cryptonite
                        You name is Lex`
                    },
                ]
            })
        });
        const data = await response.json();
        setWelcome(data.choices[0].message.content);
    };

    useEffect(() => {
        welcomeMessage()
    }, [])


    return (
        <div onKeyDown={(e) => {
            e.preventDefault();
            return e.key === 'Enter' && askAI()
        }
        }>
            <div id="lexAiMainDiv">
                <h2>Find Your Next Crypto Investment</h2>


                {!selectedSliders.length ?

                    <div id="noCoinsSelectedDiv">
                        <p id="noCoinsSelected">No coins selected</p><p id="noCoinsDescription">(select some coins to view their prices)</p>
                    </div>
                    :
                    <div id="selectedCoinsDiv">

                        {selectedSliders.map((id: string) =>
                            <label key={id}>
                                <input name="coins" type="radio" onClick={() => handleCoinData(id)} />
                                <span></span>
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </label>
                        )}

                        <button id="askAiButton" title="Ask AI" onClick={askAI} >
                            {loading ?
                                <img src="./src/assets/images/spinner.gif" style={{ filter: "saturate(50%)" }} />
                                :
                                <img src="./src/assets/images/crypto_chat-icon.png" />
                            }
                        </button>
                    </div>
                }


                <div id="answerDiv">
                    <p>{answer ? answer : welcome}</p>
                </div>
            </div>
        </div >
    );
}

export default Lex;