export async function POST(request: Request) {
  //read the body of the request
  const body = await request.json();

  console.log(body);

  //serialize the bodt to JSON and use it to create a new record

  return new Response(JSON.stringify({ status: 'ok' }));
}
