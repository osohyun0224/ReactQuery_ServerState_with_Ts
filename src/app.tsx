import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";


declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}


declare module "react-query/types/react/Hydrate" {
  interface HydrateProps {
    children?: React.ReactNode;
  }
}


function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;