const checks = [
  {
    name: "market mood",
    url: "https://coingazura-agent-endpoint.kimrla112.workers.dev/resources/market-mood-snapshot",
    requiredKeys: ["timestamp", "resource", "moodScore", "riskBias"]
  },
  {
    name: "yield candidates",
    url: "https://coingazura-agent-endpoint.kimrla112.workers.dev/resources/yield-candidates-latest",
    requiredKeys: ["timestamp", "count", "items"]
  }
];

const results = [];

for (const check of checks) {
  const response = await fetch(check.url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000)
  });

  if (!response.ok) {
    throw new Error(`Smoke check failed for ${check.name}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const missing = check.requiredKeys.filter((key) => !(key in data));

  if (missing.length > 0) {
    throw new Error(`Smoke check failed for ${check.name}: missing keys ${missing.join(", ")}`);
  }

  results.push({
    name: check.name,
    ok: true,
    url: check.url,
    sample: {
      timestamp: data.timestamp ?? null,
      resource: data.resource ?? null,
      count: data.count ?? null
    }
  });
}

console.log(JSON.stringify({ ok: true, checks: results }, null, 2));
