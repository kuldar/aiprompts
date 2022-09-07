import { prisma } from "~/db.server";

export async function loader({ request }) {
  try {
    const url = new URL(`http://localhost:${process.env.PORT ?? 3000}/`);
    // if we can connect to the database and make a simple query
    // and make a HEAD request to ourselves, then we're good.
    await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok) return Promise.reject(r);
      }),
    ]);

    return new Response("OK");
  } catch (error) {
    console.log("healthcheck ❌", { error });
    return new Response("ERROR", { status: 500 });
  }
}
