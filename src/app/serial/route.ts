export async function POST(request: Request) {
  //read the body of the request
  const body = await request.json();

  console.log(body);

  return new Response(JSON.stringify({ status: 'ok' }));
}
