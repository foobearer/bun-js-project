const server = Bun.serve({
	port: 3000,
	fetch(req) {
		return new Response("response from Bun server");
	}
	// routes: {
	// 	"api/status": new Response("OK"),
	// }
});

console.log(`🚀 Server running at ${server.url}`);