// pages/_app.js
import { SocketProvider } from '../contexts/socketContext';

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;