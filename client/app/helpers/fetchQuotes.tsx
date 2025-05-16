import { quoteType } from "../page";

type TFetchQuotes = (
  url: string,
  setItems: React.Dispatch<React.SetStateAction<quoteType[]>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void>;

export const fetchQuotes: TFetchQuotes = async (url, setItems, setIsError) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    setItems(result)
  } catch (error) {
    setIsError(true)
    console.log(error)
  }
}