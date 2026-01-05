export async function GET(request) {
  return new Response("Hello, Author API!");
}

export async function POST(request) {
  const data = await request.json();
  return new Response(`Author created with name: ${data.name}`);
}
