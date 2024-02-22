import axios from "axios";
import { useState, useEffect, useRef } from "react";

export interface Item {
  domain_name: string;
  id: string;
  domain_key: string;
  domain_token_mint: string;
  domain_auction_key: string;
  owner_key: string | null | undefined;
  availability_id: number | null | undefined;
  price: number | null | undefined;
  quote_mint: string | null | undefined;
  fixed_price_offer_account: string | null | undefined;
}

export interface Result {
  hits: Item[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
}

const URL = "https://sns-suggest-proxy.bonfida.com";

export const useDomainAutoSuggest = (domain: string) => {
  const [result, setResult] = useState<Item[] | undefined>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      const payload = { q: domain };

      const { data }: { data: Result } = await axios.post(URL, payload, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (mounted.current) {
        setResult(data.hits);
      }

      return () => (mounted.current = false);
    };
    fn().catch(console.error);
  }, [domain]);

  return result;
};
