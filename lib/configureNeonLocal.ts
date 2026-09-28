import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

/**
 * @vercel/postgres uses the Neon serverless driver (WebSocket), not the
 * Postgres TCP protocol. Point it at the compose wsproxy when set.
 */
export function configureNeonLocal() {
  const proxy = process.env.POSTGRES_WS_PROXY?.trim();
  if (!proxy) {
    return;
  }

  neonConfig.webSocketConstructor = ws;
  neonConfig.wsProxy = () => `${proxy.replace(/\/$/, '')}/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

configureNeonLocal();
