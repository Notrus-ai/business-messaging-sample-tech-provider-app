import '@/lib/configureNeonLocal';
import { Pool } from '@neondatabase/serverless';
import { sql as vercelSql } from '@vercel/postgres';

function sqlTemplate(strings: TemplateStringsArray, ...values: unknown[]): [string, unknown[]] {
  let result = strings[0] ?? '';
  for (let i = 1; i < strings.length; i++) {
    result += `$${i}${strings[i] ?? ''}`;
  }
  return [result, values];
}

let pool: Pool | undefined;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('POSTGRES_URL is not set');
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

/**
 * @vercel/postgres `sql` only accepts Neon pooled URLs or hostname localhost.
 * Docker Compose uses host `postgres`, so queries go through the Neon WS proxy.
 */
function localSql(strings: TemplateStringsArray, ...values: unknown[]) {
  const [query, params] = sqlTemplate(strings, ...values);
  return getPool().query(query, params);
}

export const sql = process.env.POSTGRES_WS_PROXY ? localSql : vercelSql;
