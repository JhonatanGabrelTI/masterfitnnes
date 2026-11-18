export const dynamic = "force-dynamic";

const visitorStore = globalThis as typeof globalThis & { masterFitnessVisits?: number };
const counterKey = "master-fitness:site-visits";

async function persistentCount(increment: boolean) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const script = increment
    ? "if redis.call('EXISTS', KEYS[1]) == 0 then redis.call('SET', KEYS[1], ARGV[1]) end return redis.call('INCR', KEYS[1])"
    : "if redis.call('EXISTS', KEYS[1]) == 0 then redis.call('SET', KEYS[1], ARGV[1]) end return redis.call('GET', KEYS[1])";
  const baseline = increment ? 199 : 200;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", script, 1, counterKey, baseline]),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Falha ao acessar o contador persistente");
  const data = await response.json() as { result?: number | string; error?: string };
  if (data.error) throw new Error(data.error);
  const count = Number(data.result);
  return Number.isFinite(count) ? Math.max(200, count) : null;
}

function currentCount() {
  if (typeof visitorStore.masterFitnessVisits !== "number") visitorStore.masterFitnessVisits = 199;
  return visitorStore.masterFitnessVisits;
}

export async function GET() {
  try {
    const count = await persistentCount(false);
    return Response.json({ count: count ?? Math.max(200, currentCount()), persistent: count !== null }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ count: Math.max(200, currentCount()), persistent: false }, { headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST() {
  try {
    const count = await persistentCount(true);
    if (count !== null) return Response.json({ count, persistent: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // The local preview fallback keeps the page functional until production credentials are connected.
  }
  const fallbackCount = Math.max(200, currentCount() + 1);
  visitorStore.masterFitnessVisits = fallbackCount;
  return Response.json({ count: fallbackCount, persistent: false }, { headers: { "Cache-Control": "no-store" } });
}
