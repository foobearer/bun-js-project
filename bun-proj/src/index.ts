import { serve } from "bun";
import index from "./index.html";

const users: Array<{ firstName: string; lastName: string; email: string }> = [];

const server = serve({
	routes: {
		"/api/hello": {
			async GET(req) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				});
			},
			async PUT(req) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				});
			},
		},

		"/api/hello/:name": async req => {
			const name = req.params.name;
			return Response.json({
				message: `Hello, ${name}!`,
			});
		},

		"/api/users/:id": async req => {
			const id = req.params.id;

			const userData = {
				id,
				name: `User ${id}`,
				email: `user${id}@example.com`,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isActive: true,
				roles: ["user"],
			};

			return Response.json(userData);
		},

		"/api/users": {
			async POST(request) {
				const data = await request.json();
				const newUser = { id: users.length, ...data };
				users.push(newUser);
				return new Response(JSON.stringify({ message: "User saved" }), {
					status: 201,
					headers: { "Content-Type": "application/json" },
				});
			},
			async GET() {
				return new Response(JSON.stringify(users), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			},
		},

		// Serve index.html for all unmatched routes.
		"/*": index,
	},
  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
